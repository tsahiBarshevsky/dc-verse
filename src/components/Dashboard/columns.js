const header = { color: 'black', letterSpacing: 1 };
const cell = { color: 'black', fontSize: 16 };

export const columns = [
    {
        name: <h2 style={header}>שם הכתבה</h2>,
        selector: 'title',
        sortable: true,
        cell: row => <div style={cell}>{row.title}</div>
    },
    {
        name: <h2 style={header}>קטגוריה</h2>,
        selector: 'category',
        sortable: true,
        cell: row => <div style={cell}>{row.category}</div>
    },
    {
        name: <h2 style={header}>תאריך</h2>,
        selector: 'date',
        sortable: true,
        cell: row => <div style={cell}>{row.date}</div>
    },
    {
        name: <h2 style={header}>אפשרויות</h2>,
        selector: 'buttons',
        sortable: false,
        // width: '175px',
        cell: row => <div style={cell}>{row.buttons}</div>
    },
];