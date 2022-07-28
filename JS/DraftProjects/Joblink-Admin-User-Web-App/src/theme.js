export const selectTheme = theme => ({
    ...theme,
    borderRadius: 4,
    colors: {
        ...theme.colors,
        primary25: 'rgba(220, 252, 231, .7)',
        primary: '#22C55E',
    },
})

export const PieChartBgColor = '#eee'