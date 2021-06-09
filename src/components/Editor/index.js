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

export default function Editor() 
{
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [credit, setCredit] = useState('');
    const [disableTitle, setDisableTitle] = useState(true);
    const [disableCategory, setDisableCategory] = useState(true);
    const [disableText, setDisableText] = useState(true);
    const [disableSending, setDisableSending] = useState(true);
    const [progress, setProgress] = useState(0);
    const [state, setState] = useState({
        title: false,
        checkCategory: false,
        checkText: false,
    });

    const { checkTitle, checkSubtitle, checkCategory, checkText, checkCredit, checkTags } = state;
    const errorCheck = [checkTitle, checkSubtitle, checkCategory, checkText, checkCredit, checkTags].filter((v) => v).length !== 3;
    const classes = useStyles();

    useEffect(() => {
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
        switch(category)
        {
            case '':
                setDisableCategory(true);
                break;
            default: setDisableCategory(false);
        }
        switch(text)
        {
            case '':
                setDisableText(true);
                break;
            default: setDisableText(false);
        }
    }, [setDisableTitle, setDisableCategory, setDisableText,
        title, category, text, errorCheck, setDisableSending]);

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
        setCategory('');
        setText('');
        setDate(new Date());
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

    return (
        <div className="editor-container">
            <h2>הוספת פוסט חדש</h2>
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
                        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', '|', 'block quote', 'undo', 'redo']
                    }}
                    editor={ClassicEditor}
                    data={text}
                    onChange={(event, editor) => 
                    {
                        setText(editor.getData());
                    }}
                />
            </div>
            <FormControl required error={errorCheck} component="fieldset">
                <FormLabel component="legend" style={!errorCheck ? {color: '#f9f6f7'} : null}>צ'ק ליסט</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control=
                        {
                            <Checkbox 
                                checked={checkTitle}
                                onChange={handleChange} 
                                name="checkTitle"
                                iconStyle={{fill: '#f9f6f7'}}
                                inputStyle={{color:'#f9f6f7'}}
                                style={{color:'#f9f6f7'}} />
                            }
                        label={<p style={{color: '#f9f6f7'}}>כותרת</p>}
                        className="checkBox"
                        disabled={disableTitle}
                    />
                    <FormControlLabel
                        control=
                        {
                            <Checkbox 
                                checked={checkCategory} 
                                onChange={handleChange} 
                                name="checkCategory" 
                                iconStyle={{fill: '#f9f6f7'}}
                                inputStyle={{color:'#f9f6f7'}}
                                style={{color:'#f9f6f7'}} />
                        }
                        label={<p style={{color: '#f9f6f7'}}>קטגוריה</p>}
                        className="checkBox"
                        disabled={disableCategory}
                    />
                    <FormControlLabel
                        control=
                        {
                            <Checkbox 
                                checked={checkText}
                                onChange={handleChange} 
                                name="checkText"
                                iconStyle={{fill: '#f9f6f7'}}
                                inputStyle={{color:'#f9f6f7'}}
                                style={{color:'#f9f6f7'}} />
                        }
                        label={<p style={{color: '#f9f6f7'}}>טקסט</p>}
                        className="checkBox"
                        disabled={disableText}
                    />
                    <FormHelperText className="helper" style={!errorCheck ? {color: '#f9f6f7'} : null}>
                        {!errorCheck ? "יאללה, שגר אותו!" : "אופס, לא סימנת הכל"}
                    </FormHelperText>
                </FormGroup>
            </FormControl>
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
            await firebase.addPost(title, date, category, text, image, credit);
            notify("success", "הפוסט נוסף בהצלחה");
            setDisableSending(true);
        } 
        catch (error) 
        {
            notify('error', 'קרתה שגיאה');
            console.log(error.message);
        }
    }
}
