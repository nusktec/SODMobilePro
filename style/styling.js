export const BG_COLOR = '#f9fcff';
export const NAV_BAR = '#f2f5f8';
export const BG_COLOR2 = '#f9f9ff';
export const TEXT_COLOR = '#536372';
export const TEXT_COLOR3 = '#65798b';
export const TEXT_COLOR2 = 'rgba(84, 100, 115, 0.17)';
export const COLOR1 = '#3c5eaa';
export const COLOR2 = '#ff3339';

export const StyleSplash = {
    container: {
        padding: 0,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: BG_COLOR2
    },
    view1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    footerCredit: {
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: 'Baloo'
    },
}

export const TextStyles = {
    h1: {
        color: TEXT_COLOR,
        fontSize: 30,
        fontWeight: "bold"
    },
    h2: {
        color: TEXT_COLOR,
        fontSize: 20,
        fontWeight: "bold"
    },
    h3: {
        color: TEXT_COLOR,
        fontSize: 15,
        fontWeight: "bold"
    }
};

//General flavours
export const Flavours = {
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 1,
    }
};

export const Flavours2 = {
     shadow: (sh)=> {
         return {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: sh,
    }}
};