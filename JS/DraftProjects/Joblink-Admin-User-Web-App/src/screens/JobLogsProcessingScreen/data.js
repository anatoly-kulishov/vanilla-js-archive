export const theadData = ['Date', 'Time', 'Length', 'Employee', 'Location', 'Job role', 'Phase status'];
export const tableData = [
    {
        id: 1,
        date: '12.1.',
        time: '15:00-20:00',
        length: '8 hrs',
        employee: 'Name Surname',
        location: 'Location name',
        jobRole: 'Job role',
        status: {
            title: 'Log rejected by Joblink',
            color: 'info'
        }
    },
    {
        id: 2,
        date: '12.1.',
        time: '15:00-20:00',
        length: '8 hrs',
        employee: 'Name Surname',
        location: 'Location name',
        jobRole: 'Job role',
        status: {
            title: 'Wating for customer’s approval',
            color: 'warning'
        }
    },
    {
        id: 3,
        date: '12.1.',
        time: '15:00-20:00',
        length: '8 hrs',
        employee: 'Name Surname',
        location: 'Location name',
        jobRole: 'Job role',
        status: {
            title: 'Log rejected by Joblink',
            color: 'light-danger'
        }
    }
]

export const filterOptions = [
    {value: 'all', label: 'Show all'},
    {value: 'unprocessed', label: 'Unprocessed'},
    {value: 'open', label: 'Open'},
    {value: 'filled', label: 'Filled'},
    {value: 'failed', label: 'Failed'},
    {value: 'completed', label: 'Completed'},
]