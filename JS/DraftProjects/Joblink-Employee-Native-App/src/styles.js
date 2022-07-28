import {THEME} from "./theme";

export const CalendarStyles = {
    arrowColor: THEME.MAIN_COLOR,
    monthTextColor: '#27272A',
    dayTextColor: '#65656b',
    todayTextColor: "#000",
}

export const SelectMultipleStyles = {
    wrapper: {
        height: "100%",
        backgroundColor: '#fff'
    },
    container: {
        paddingVertical: 30,
        paddingHorizontal: 15,
    },
    rowStyle: {
        borderBottomWidth: 1,
        borderColor: "#D4D4D8",
        backgroundColor: THEME.GREY_COLOR_2
    },
    FlatList: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#D4D4D8",
    },
    labelStyle: {
        marginLeft: 3,
        fontSize: 16,
    }
}

export const BadgeStyles = {
    badges: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        marginRight: 12,
        marginBottom: 12,
        backgroundColor: THEME.GREY_COLOR_2
    },
    badgeAdd: {
        backgroundColor: THEME.SECONDARY_COLOR
    },
    badgeTitle: {
        fontFamily: "Inter-Medium",
        fontSize: 17,
        marginRight: 10
    },
    badgeAddTitle: {
        marginRight: 2,
        marginLeft: 8,
        color: THEME.MAIN_COLOR
    }
}

export const JobStyles = {
    container: {
        paddingHorizontal: 15,
        height: '100%',
        backgroundColor: '#fff',
    },
    section: {
        marginBottom: 25,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    subRow: {
        width: 140,
    },
    title: {
        marginBottom: 5,
        fontSize: 28,
    },
    subTitle: {
        marginBottom: 4,
        fontSize: 15,
        color: "#71717A"
    },
    dt: {
        marginRight: 4,
        fontSize: 15,
        color: THEME.GREY_COLOR_3
    },
    dd: {
        fontSize: 15,
    },
    box: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: THEME.GREY_COLOR,
        backgroundColor: THEME.GREY_COLOR_2
    },
    boxTitle: {
        marginBottom: 3,
        fontSize: 17,
    },
    boxDesc: {
        lineHeight: 21,
        color: THEME.GREY_COLOR_3
    },
    badge: {
        marginRight: 8,
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: "#4ADE80",
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 16,
        lineHeight: 24,
        color: "#3F3F46"
    }
}

export const BoxesStyles = {
    box: {
        marginBottom: 8,
        padding: 12,
        paddingBottom: 8,
        borderWidth: 1,
        borderColor: THEME.GREY_COLOR,
        backgroundColor: THEME.GREY_COLOR_2
    },
    boxActive: {
        backgroundColor: THEME.SECONDARY_COLOR
    },
    boxTitleWrap: {
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    boxTitle: {
        fontFamily: "Inter-Medium",
        fontSize: 17,
    },
    boxSubTitle: {
        marginBottom: 4,
        fontSize: 15,
        color: THEME.GREY_COLOR_3
    },
    boxDesc: {
        marginBottom: 4,
        fontSize: 13,
        color: THEME.GREY_COLOR_3
    },
    arrow: {
        position: 'absolute',
        top: '55%',
        right: 10,
    },
    arrowImg: {
        height: 12,
        width: 6
    },
    activeDot: {
        marginRight: 4,
        borderWidth: 6,
        borderColor: "#4ADE80",
        borderRadius: 50,
    },
}

export const BaseCalendarIconStyles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
        padding: 4,
        paddingTop: 5,
        paddingLeft: 5,
    },
    icon: {
        position: 'absolute',
        top: -8,
        left: 9,
        zIndex: 2,
    },
    title: {
        fontSize: 14,
        color: "#52525B"
    }
}
