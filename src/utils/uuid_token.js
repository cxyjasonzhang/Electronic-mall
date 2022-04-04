import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
    let uuId = localStorage.getItem('UUID');
    if (!uuId) {
        uuId = uuidv4();
        localStorage.setItem('UUID', uuId);
    }
    return uuId
}