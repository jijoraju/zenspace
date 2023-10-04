// toastService.js
import { toast } from 'react-toastify';

export const showToast = (message, type = 'info') => {
  switch (type) {
    case 'success':
      toast.success(message,{
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case 'error':
      toast.error(message,{
        position: toast.POSITION.TOP_CENTER
      });
      break;
    case 'warning':
      toast.warning(message,{
        position: toast.POSITION.TOP_CENTER
      });
      break;
    default:
      toast.info(message,{
        position: toast.POSITION.TOP_CENTER
      });
      break;
  }
};

export const closeToast = ()=>{
  toast.dismiss();
}

export const toastPromise = ()=>{
  const resolveAfter3Sec = new Promise((resolve,reject) => setTimeout(resolve, 3000));
  toast.promise(
      resolveAfter3Sec,
      {
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯'
      },
      {
        position: toast.POSITION.TOP_CENTER
      }
  )
}