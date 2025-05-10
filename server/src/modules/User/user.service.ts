import { IUser } from './user.interface';
import User from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  userData.role = 'admin';
  const result = await User.create(userData);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateUserIntoDB = async (id: string, data: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};
const getTotalUserCountFromDB = async () => {
  const result = await User.aggregate([
    {
      $group: {
        _id: null,
        totalUser: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        totalUser: 1,
      },
    },
  ]);
  return result[0]?.totalUser || 0;
};
export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  getTotalUserCountFromDB
};
