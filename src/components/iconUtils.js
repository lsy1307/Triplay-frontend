export const getIconWho = (tripParty) => {
    switch (tripParty) {
        case '가족과':
            return "../src/assets/images/icons/party/family.png";
        case '친구와':
            return "../src/assets/images/icons/party/friends.png";
        case '연인과':
            return "../src/assets/images/icons/party/couple.png";
        case '나혼자':
            return "../src/assets/images/icons/party/solo.png";
        default:
            return null;
    }
};

export const getIconTheme = (theme) => {
    switch (theme) {
        case 'relax':
            return "../src/assets/images/icons/theme/relax.png";
        case 'adventure':
            return "../src/assets/images/icons/theme/adventure.png";
        case 'culture':
            return "../src/assets/images/icons/theme/culture.png";
        case 'nature':
            return "../src/assets/images/icons/theme/nature.png";
        default:
            return null;
    }
};
