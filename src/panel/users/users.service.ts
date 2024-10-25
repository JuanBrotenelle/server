import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../models/user.model';

interface FindUsersParams {
  quantity: number;
  sort: string;
  order: number;
  status?: string;
  strict: number;
  search?: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findUsers(params: FindUsersParams): Promise<User[]> {
    const { quantity, sort, order, status, strict, search } = params;

    console.log(quantity, sort, order, status, Number(strict), search);

    const filter: any = {};
    if (status) {
      if (status === 'today') {
        filter['otherInfo.created_at'] = { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) };
      } else {
        filter['currentStatus'] = status;
      }
    }

    if (Number(strict) === 0 && search) {
      filter.$text = { $search: search };
    }

    const sortOptions: any = {};
    if (sort === 'created_at') {
      sortOptions['otherInfo.Created_at'] = Number(order) === -1 ? -1 : 1;
    } else if (sort !== 'none') {
      sortOptions[sort] = Number(order) === -1 ? -1 : 1;
    }

    let query = this.userModel.find(filter).sort(sortOptions);
    if (quantity > 0) {
      query = query.limit(quantity);
    }

    return query.exec();
  }
}
