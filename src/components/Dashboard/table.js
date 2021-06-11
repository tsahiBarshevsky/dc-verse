import React from 'react';
import { columns } from './columns';
import DataTable, { createTheme } from 'react-data-table-component';
import { createMuiTheme, MuiThemeProvider, Typography } from '@material-ui/core';

createTheme('solarized', 
{
    background: { default: '#fdfdff' }
});

const theme = createMuiTheme({
    typography:
    {
        allVariants: { fontFamily: `"Varela Round", sans-serif` },
        h5: { fontWeight: 600, letterSpacing: 2, marginBottom: 10 }
    }
})

export default function PostsTable({posts}) 
{
    return (
        <div className="table-container">
            <DataTable
                title=
                {
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h5">כתבות</Typography>
                    </MuiThemeProvider>
                }
                columns={columns}
                data={posts}
                pagination
                pointerOnHover
                theme="solarized"
            />
        </div>
    )
}

