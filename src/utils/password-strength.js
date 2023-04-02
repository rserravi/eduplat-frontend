/**
 * Password validator for login pages
 */
import i18next from 'i18next';

// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return { label: i18next.t('Poor'), color: '#f44336' };
    if (count < 3) return { label: i18next.t('Weak'), color: '#ffc107' };
    if (count < 4) return { label: i18next.t('Normal'), color: '#ffab91' };
    if (count < 5) return { label: i18next.t('Good'), color: '#673ab7' };
    if (count < 6) return { label: i18next.t('Strong'), color: '#00c853' };
    return { label: i18next.t('Poor'), color: '#f44336' };
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};
