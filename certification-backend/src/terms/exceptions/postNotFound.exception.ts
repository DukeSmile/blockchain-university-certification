import { NotFoundException } from '@nestjs/common';

class PostNotFoundException extends NotFoundException {
  constructor(address: string) {
    super(`Post with address ${address} not found`);
  }
}

export default PostNotFoundException;
