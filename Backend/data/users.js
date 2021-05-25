import bcrypt from 'bcryptjs';

const users=[
    { 
        name:"qhizer",
        password: bcrypt.hashSync('BLACKMARKET',10),
        email:"mrtobot085@gmail.com",
        isAdmin:true
    },
    { 
        name:"John Doe",
        password:bcrypt.hashSync('123456',10),
        email:"mrtobot084@gmail.com",
    },
    { 
        name:"JACK",
        password:bcrypt.hashSync('123456',10),
        email:"mrtobot083@gmail.com",
        isAdmin:true
    }
];
//passwords will be hashed using bcryptjs with 10 rounds of encryption

export default users;