export const hello = (req, res)=>{
    res.send ('Hello World!!!')
}

export const getstudents = (req, res)=>{
    const students = [
        {name:'Jane Doe', grade:10},
        {name:'John Doe', grade:9},
        {name:'Sally Doe', grade:8},
        {name:'Peter Doe', grade:7},
        {name:'Del Doe', grade:6},
        {name:'Humpery Doe', grade:5},
        {name:'Jecinta Doe', grade:4},

    ]
    res.send (students);
};


export const getusers = (req, res)=>{
    const users = [
        {
          firstName: 'Jane',
          lastName: 'Doe',
          emailAddress: 'jane@gmail.com',
          phoneNumber: '0723457689',
          password: '10002',
        },

        {
            firstName: 'John',
            lastName: 'Doe',
            emailAddress: 'john@gmail.com',
            phoneNumber: '0789453627',
            password: '87365',
        },

        {
            firstName: 'Sally',
            lastName: 'Doe',
            emailAddress: 'sally@gmail.com',
            phoneNumber: '0787654439',
            password: '89864',
        },

    ]
    res.send (users);
};
