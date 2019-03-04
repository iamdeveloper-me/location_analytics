
class PopupService {

    showPopup(obj){
        if( obj.errorArr !== undefined){
            for(let x in obj.errorArr){
                alert(obj.errorArr[x]);
            }
        }
        if(obj.successArr !== undefined){
            for(let x in obj.successArr){
                alert(obj.successArr[x]);
            }
        }
    }
}

export default PopupService;