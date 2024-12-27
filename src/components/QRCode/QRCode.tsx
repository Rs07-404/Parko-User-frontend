import { useAuthContext } from "../../context/AuthContext"

const QRCode = () => {
    const { authUser } = useAuthContext()
    return (
        authUser?.qrcode && <svg dangerouslySetInnerHTML={{__html: authUser.qrcode}} />
    )
}

export default QRCode;