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
import { withRouter } from 'react-router-dom';
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

function EditPost(props)
{
    const title = props.match.params.title.replaceAll('-', ' ');
    const [post, setPost] = useState({});
    const [category, setCategory] = useState('');
    const [text, setText] = useState('');
    const [firstRun, setFirstRun] = useState(true);
    const [date, setDate] = useState(new Date());
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');
    const [credit, setCredit] = useState('');
    const classes = useStyles();

    useEffect(() => {
        document.title = `DC Verse | עריכת כתבה`;
        if (firstRun)
        {
            firebase.getPost(title).then(setPost);
            setFirstRun(false);
        }
        setCategory(post.category);
        if (post.date)
        {
            console.log("in");
            setDate(new Date(post.date.seconds * 1000));
        }
        setText(post.text);
        setImage(post.image);
        setCredit(post.credit);
    }, [post, firstRun, title]);

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
                notify("success", "ההעלאה התחילה");
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
                        notify("error", "קרתה שגיאה");
                    },
                    () => {
                        firebase.storage.ref(`posts/`).child(title).getDownloadURL().then(
                            url => setImage(url)
                        ).then(notify("success", "התמונה עלתה בהצלחה")).then(setProgress(0));
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
            <h2>עריכת {title}</h2>
            <StylesProvider jss={jss}>
                <MuiThemeProvider theme={theme}>
                    <FormControl margin="normal" fullWidth>
                        <Input
                            id="category" name="category"
                            variant="outlined"
                            autoComplete="off"
                            value={category}
                            className={classes.input}
                            placeholder="קטגוריה..."
                            disableUnderline
                            onChange={e => setCategory(e.target.value)} />
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            label={<h4 style={{marginRight: 15}}>תאריך</h4>}
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
                            placeholder="קרדיט תמונה ראשית..."
                            disableUnderline
                            onChange={e => setCredit(e.target.value)} />
                    </FormControl>
                    <div className="image-uploader">
                        <Button
                            variant="contained"
                            component="label"
                            className={classes.button}>
                            העלאת תמונה ראשית
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
            <div className="buttons">
                <Button className="button"
                    variant="contained"
                    onClick={editPost}
                    >שלח</Button>
            </div>
            <ToastContainer
                position="bottom-center"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    ) : <div className="full-container"><h1>טוען נתונים...</h1></div>

    async function editPost()
    {
        if (category !== '' && text !== '')
        {
            try
            {
                var parsedText = text.replace(/<[^>]+>/g, '');
                const preview = parsedText.length >= 220 ? `${parsedText.slice(0, 220)}...` : parsedText;
                await firebase.editPost(title, date, category, text, preview, image, credit);
                notify("success", 'הכתבה עודכנה בהצלחה! מיד תועבר לדשבורד')
                setTimeout(() =>
                {
                    props.history.replace("/dashboard");
                }, 5000);
            }
            catch (error)
            {
                console.log(error.message);
                notify('error', 'קרתה שגיאה בלתי צפויה!');
            }
        }
        else
            notify('error', 'אחד השדות (קטגוריה או טקסט) נותר ריק');
    }
}

export default withRouter(EditPost);