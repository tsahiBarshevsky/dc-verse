import React, { useState, useEffect } from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor as TextEditor } from "@ckeditor/ckeditor5-react";
import '@ckeditor/ckeditor5-build-classic/build/translations/he';
import { Button, FormControl, Input } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, StylesProvider, jssPreset, makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from '@ramonak/react-progress-bar';
import { Link } from 'react-router-dom';
import LoadingAnimation from '../Loading';
import firebase from '../firebase';

const theme = createMuiTheme({direction: 'rtl'});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles({
    input:
    {
        width: 300,
        height: 45,
        borderRadius: 5,
        padding: '0 10px',
        backgroundColor: 'white',
        border: '1px solid black',
        fontFamily: `"Varela Round", sans-serif`
    },
    button:
    {
        color: 'white',
        backgroundColor: '#ffa301',
        margin: '10px 0 10px 20px',
        width: 300,
        borderRadius: 5,
        '&:hover':
        {
            backgroundColor: '#ffa302CC'
        }
    }
})

export default function EditPost(props)
{
    const title = props.match.params.title.replaceAll('-', ' ');
    const [post, setPost] = useState({});
    const [text, setText] = useState('');
    const [firstRun, setFirstRun] = useState(true);
    const [date, setDate] = useState(new Date());
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');
    const [credit, setCredit] = useState('');
    const [sent, setSent] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        document.title = `DC Verse | ?????????? ????????`;
        if (firstRun)
        {
            firebase.getPost(title).then(setPost);
            setFirstRun(false);
        }
        if (post.date)
        {
            console.log("in");
            setDate(new Date(post.date.seconds * 1000));
        }
        setText(post.text);
        setImage(post.image);
    }, [post, firstRun, title]);

    if (!firebase.getCurrentUsername()) {
		props.history.replace('/admin');
		return null;
	}

    const handleDateChange = (date) =>
    {
        setDate(date);
    }

    const uploadMainImage = (e) =>
	{
		if (e.target.files[0])
		{
			try
			{
                notify("success", "???????????? ????????????");
                const uploadTask = firebase.storage.ref(`posts/${title}`).put(e.target.files[0]);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log(progress);
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                        notify("error", "???????? ??????????");
                    },
                    () => {
                        firebase.storage.ref(`posts/`).child(title).getDownloadURL().then(
                            url => setImage(url)
                        ).then(notify("success", "???????????? ???????? ????????????")).then(setProgress(0));
                    }
                );
			}
			catch (error)
			{
				console.log(error.message);
			}
		}
	}

    const notify = (type, message) =>
    {
        switch (type)
        {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default: return null;
        }
    }

    return Object.keys(post).length !== 0 ? (
        <div className="editor-container">
            <h2>?????????? "{title}"</h2>
            <StylesProvider jss={jss}>
                <MuiThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            label={<h4 style={{marginRight: 15}}>??????????</h4>}
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            value={date}
                            onChange={handleDateChange}
                            className={classes.input}
                            InputProps={{disableUnderline: true}}
                            KeyboardButtonProps={{'aria-label': 'change date',}} />
                    </MuiPickersUtilsProvider>
                    <FormControl margin="normal" fullWidth>
                        <Input
                            id="credit" name="credit"
                            variant="outlined"
                            autoComplete="off"
                            value={credit}
                            className={classes.input}
                            placeholder="?????????? ?????????? ??????????..."
                            disableUnderline
                            onChange={e => setCredit(e.target.value)} />
                    </FormControl>
                    <div className="image-uploader">
                        <Button
                            variant="contained"
                            component="label"
                            className={classes.button}>
                            ?????????? ?????????? ??????????
                            <input
                                accept="image/*"
                                id="upload-main-photo"
                                name="upload-main-photo"
                                type="file"
                                hidden
                                onChange={uploadMainImage} />
                        </Button>
                        {progress > 0 ?
                        <ProgressBar
                            width="250px"
							completed={progress}
							bgColor="#ffa301"
							labelColor="#ffffff"
							labelAlignment="center" /> : null}
                    </div>
                </MuiThemeProvider>
            </StylesProvider>
            <div className="text-editor">
                <TextEditor
                    config=
                    {{
                        language: 'he',
                        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', '|', 'undo', 'redo']
                    }}
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) =>
                    {
                        setText(editor.getData());
                    }}
                />
            </div>
            {!sent ?
            <div className="buttons">
                <Button className="button"
                    variant="contained" 
                    onClick={editPost}>??????</Button>
            </div>
            :
            <div className="links">
                <Link className="link" to='/dashboard'>?????????? ??????????????</Link>
                <Link className="link" to={{pathname: `/${title.replace(/\s+/g, '-')}`}}>?????????? ??????????</Link>
                <Link className="link" to='/'>?????? ????????</Link>
            </div>}
            <ToastContainer
                position="bottom-center"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    ) : <LoadingAnimation text="???????? ????????????..." />

    async function editPost()
    {
        if (text !== '')
        {
            try
            {
                var parsedText = text.replace(/<[^>]+>/g, '');
                const preview = parsedText.length >= 220 ? `${parsedText.slice(0, 220)}...` : parsedText;
                await firebase.editPost(title, date, text, preview, image, credit);
                notify("success", '?????????? ???????????? ????????????!');
                setSent(true);
            }
            catch (error)
            {
                console.log(error.message);
                notify('error', '???????? ?????????? ???????? ??????????!');
            }
        }
        else
            notify('error', '?????????? ???????? ??????');
    }
}
