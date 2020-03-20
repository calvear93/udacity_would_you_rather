import SwalDefault from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Swal = withReactContent(SwalDefault);

/**
 * Shows a confirm dialog.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 *
 * @returns {any} Popup.
 */
const Confirm = (type, content) => Swal.fire({
    icon: type,
    html: content,
    confirmButtonColor: '#009c95',
    confirmButtonText: 'Okay',
    allowOutsideClick: false
});

/**
 * Shows a alert popup.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 *
 * @returns {any} Popup.
 */
const Alert = (type, content) => Swal.fire({
    icon: type,
    html: content,
    confirmButtonColor: '#009c95',
    confirmButtonText: 'Okay',
    showCancelButton: false,
    showConfirmButton: false
});

/**
 * Shows a confirm dialog with Ok and Cancel button.
 *
 * @param {string} type Dialog type from SweetAlert2.
 * @param {string} content JSX content for the dialog.
 *
 * @returns {any} Popup.
 */
const Dialog = (type, content) => Swal.fire({
    icon: type,
    html: content,
    confirmButtonColor: '#009c95',
    cancelButtonColor: '#DCDCDC',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    showCancelButton: true,
    allowOutsideClick: false,
    reverseButtons: true
});

export {
    Swal,
    Alert,
    Confirm,
    Dialog
};
