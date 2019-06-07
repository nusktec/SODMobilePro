//date return in string
import {Linking} from 'react-native';
import Toast from "react-native-simple-toast";

export const getMonthLetter = (mth) => {
    switch (mth) {
        case 1:
            return 'January';
            break;
        case 2:
            return 'February';
            break;
        case 3:
            return 'March';
            break;
        case 4:
            return 'April';
            break;
        case 5:
            return 'May';
            break;
        case 6:
            return 'June';
            break;
        case 7:
            return 'July';
            break;
        case 8:
            return 'August';
            break;
        case 9:
            return 'September';
            break;
        case 10:
            return 'October';
            break;
        case 11:
            return 'November';
            break;
        case 12:
            return 'December';
            break;
        default:
            return 'Month';
    }
};

export const getDateString = (date) =>{
    //filter and arrange today's sod
        let day64 = date.split(" ")[0];
        day64 = day64.split("-");
        return day64[2] + " " + getMonthLetter(parseInt(day64[1])) +  ", " + day64[0];
};

export const marketLink = "https://play.google.com/store/apps/details?id=com.rscbyte.sodmobilepro";

export const OpenUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            Toast.show("Unable to links");
        }
    });
};