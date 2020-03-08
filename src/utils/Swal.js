import SwalDefault from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Swal = withReactContent(SwalDefault);

const Alert = (type, content) => Swal.fire({
    icon: type,
    html: content,
    confirmButtonColor: '#009c95',
    confirmButtonText: 'Okay'
});

export {
    Swal,
    Alert
};
