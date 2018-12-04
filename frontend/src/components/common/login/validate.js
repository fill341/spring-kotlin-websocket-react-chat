export default function validate(values, props) {

    const username = values.get('username');
    const password = values.get('password');

    const errors = {};

    if (!username) {
        errors.username = 'required';
    }

    if (!password) {
        errors.password = 'required';
    }

    return errors;
}
