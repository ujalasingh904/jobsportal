import { default as mongoose } from 'mongoose';

const connecToDb = async () => {
    const connectionURL = process.env.MONGODB_URI;

    if (!connectionURL) {
        throw new Error('MONGODB_URI is not defined');
    }

    mongoose
        .connect(connectionURL)
        .then(() => console.log('Connected to database'))
        .catch((error:any) => console.error('Error connecting to database', error));

}

export default connecToDb;