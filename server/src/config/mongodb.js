/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

// khởi tạo đối tượng chattingSystemInstance đến database ban đầu là null
let chattingSystemInstance = null;

// khởi tạo một đối tượng mongoClientInstance để kết nối mongodb
const mongoClientInstance = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// kết nối database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB với URL đã khai báo trong mongoClientInstance
  await mongoClientInstance.connect();

  chattingSystemInstance = mongoClientInstance.db(process.env.DATABASE_NAME);
};

// Đóng kết nối với database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};

// Function Get_DB không async này có nhiệm vụ export ra cái chattingSystemInstance sau khi đã connect thành công tới mongodb để tái sử dụng nhìu nơi khác nhau trong code.
// Note: lưu ý phải đảm bảo chỉ luôn gọi cái GET_DB này sau khi đã kết nối thành công tới mongodb
export const GET_DB = () => {
  if (!chattingSystemInstance) throw new Error('Must connect to Database first');
  return chattingSystemInstance;
};
