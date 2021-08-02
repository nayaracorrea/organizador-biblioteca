import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { BookDto } from "src/DTO/books.dto";
import { Book } from "../Interfaces/book.interface";

@Injectable()
export class BookRepository {
  constructor(@InjectModel("book") private readonly bookModel: Model<Book>) { }

  async getAllBooks(): Promise<Book[]> {
    return await this.bookModel
      .find({}, { __v: false })
      .sort({ name: +1 })
      .exec();
  }

  async getBookById(bookID: ObjectId): Promise<Book> {
    return await this.bookModel.findById(bookID, { __v: false });
  }

  async getBookByAuthorName(authorName: string[]): Promise<Book[]> {
    return await this.bookModel.find({
      $or: [
        { "author.name": { $in: authorName } },
        { "author.surname": { $in: authorName } },
      ]
    })
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    return await this.bookModel.find({
        name: { $regex: bookName, $options: "i" },
      },
      { __v: false },
    );
  }

  async saveBook(newBook: BookDto): Promise<Book> {
    const saveBook = new this.bookModel(newBook);
    return await saveBook.save();
  }

  async deleteBookById(bookID: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete({ _id: bookID });
  }

  async updateBookById(bookID: ObjectId, newBook: BookDto): Promise<Book> {
    return await this.bookModel.replaceOne({ _id: bookID }, newBook);
  }
}
