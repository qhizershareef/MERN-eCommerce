import { Alert  } from 'react-bootstrap';


//here children in props takes in child or inside the tag contents
const Message=({variant, children})=>{
    return(
        <div>
            <Alert  variant={variant}>
                {children}  
            </Alert>
        </div>
    )
}

Message.defaultProps={
    variant:'info'
}

export default Message;