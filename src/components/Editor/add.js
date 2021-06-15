import React, { useState, useEffect } from 'react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor as TextEditor } from "@ckeditor/ckeditor5-react";
import '@ckeditor/ckeditor5-build-classic/build/translations/he';
import { 
    Button, Checkbox, FormControl, FormGroup, FormLabel, 
    FormControlLabel, Input, FormHelperText } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider, StylesProvider, jssPreset, makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from '@ramonak/react-progress-bar';
import InputTags from "react-input-tags-hooks";
import 'react-input-tags-hooks/build/index.css';
import { Link } from 'react-router-dom';
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

export default function Editor(props) 
{
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState('');
    const [credit, setCredit] = useState('');
    const [disableTitle, setDisableTitle] = useState(true);
    const [disableText, setDisableText] = useState(true);
    const [disableSending, setDisableSending] = useState(true);
    const [sent, setSent] = useState(false);
    const [progress, setProgress] = useState(0);
    const [state, setState] = useState({
        title: false,
        checkText: false,
    });

    const { checkTitle, checkText } = state;
    const errorCheck = [checkTitle, checkText].filter((v) => v).length !== 2;
    const classes = useStyles();

    useEffect(() => {
        document.title = `DC Verse | הוספת כתבה חדשה`;
        if (!errorCheck) 
            setDisableSending(false);
        else
            setDisableSending(true)
        switch(title)
        {
            case '': 
                setDisableTitle(true)
                break;
            default: 
                setDisableTitle(false);
        }
        switch(text)
        {
            case '':
                setDisableText(true);
                break;
            default: setDisableText(false);
        }
    }, [setDisableTitle, setDisableText,
        title, text, errorCheck, setDisableSending]);

    if (!firebase.getCurrentUsername()) {
        props.history.replace('/admin');
        return null;
    }

    const handleDateChange = (date) => 
    {
        setDate(date);
    }

    const handleChange = (event) => 
    {
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    const clearForm = () =>
    {
        setTitle('');
        setText('');
        setDate(new Date());
        setCredit('');
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

    const getTags = (tags) => 
    {
        setTags(tags);
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

    return (
        <div className="editor-container">
            <h2>הוספת כתבה חדשה</h2>
            <StylesProvider jss={jss}>
                <MuiThemeProvider theme={theme}>
                    <FormControl margin="normal">
                        <Input
                            id="title" name="title"
                            variant="outlined"
                            color='black'
                            autoComplete="off" 
                            autoFocus value={title} 
                            className={classes.input}
                            placeholder="כותרת..."
                            disableUnderline
                            onChange={e => setTitle(e.target.value)} />
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
                        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', '|' , 'undo', 'redo']
                    }}
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) => 
                    {
                        setText(editor.getData());
                    }}
                />
            </div>
            <InputTags
                className="input-tags"
                onTag={getTags}
                tagColor="#ffa301"
                placeHolder="הוסף תגית..."
            />
            <FormControl required error={errorCheck} component="fieldset">
                <FormLabel component="legend" style={!errorCheck ? {color: '#000000'} : null}>צ'ק ליסט</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control=
                        {
                            <Checkbox 
                                checked={checkTitle}
                                onChange={handleChange} 
                                name="checkTitle"
                                iconStyle={{fill: '#000000'}}
                                inputStyle={{color:'#000000'}}
                                style={{color:'#000000'}} />
                            }
                        label={<p style={{color: '#000000'}}>כותרת</p>}
                        className="checkBox"
                        disabled={disableTitle}
                    />
                    <FormControlLabel
                        control=
                        {
                            <Checkbox 
                                checked={checkText}
                                onChange={handleChange} 
                                name="checkText"
                                iconStyle={{fill: '#000000'}}
                                inputStyle={{color:'#000000'}}
                                style={{color:'#000000'}} />
                        }
                        label={<p style={{color: '#000000'}}>טקסט</p>}
                        className="checkBox"
                        disabled={disableText}
                    />
                    <FormHelperText className="helper" style={!errorCheck ? {color: '#000000'} : null}>
                        {!errorCheck ? "יאללה, שגר אותו!" : "אופס, לא סימנת הכל"}
                    </FormHelperText>
                </FormGroup>
            </FormControl>
            {!sent ?
            <div className="buttons">
                <Button className="button"
                    variant="contained" 
                    onClick={addPost} 
                    disabled={disableSending}
                    style={disableSending ? {backgroundColor: '#888888'} : null}>שלח</Button>
                <Button className="button"
                    variant="contained"
                    onClick={() => clearForm()}>נקה</Button>
            </div>
            :
            <div className="links">
                <Link className="link" to='/dashboard'>בחזרה לדשבורד</Link>
                <Link className="link" to={{pathname: `/${title.replace(/\s+/g, '-')}`}}>צפייה בפוסט</Link>
                <Link className="link" to='/'>לדף הבית</Link>
            </div>}
            <ToastContainer
                position="bottom-center"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )

    async function addPost()
    {
        try 
        {
            var parsedText = text.replace(/<[^>]+>/g, '');
            const preview = parsedText.length >= 220 ? `${parsedText.slice(0, 220)}...` : parsedText;
            await firebase.addPost(title, date, text, preview, image, credit, tags);
            notify("success", "הכתבה נוספה בהצלחה!");
            setDisableSending(true);
            setSent(true);
        } 
        catch (error) 
        {
            notify('error', 'קרתה שגיאה');
            console.log(error.message);
        }
    }
}
