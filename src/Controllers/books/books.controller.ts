import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ObjectId } from "mongoose";
import { Book } from "src/Mongo/Interfaces/book.interface";
import { BooksService } from "src/Services/books/books.service";

import { BookDto } from "../../DTO/books.dto";

@Controller("books")
export class BooksController {
  constructor(private readonly bookService: BooksService) { }

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return await this.bookService.getAllBooks();
  }

  @Get("id/:bookID")
  async getBookById(@Param("bookID") bookID: ObjectId): Promise<Book> {
    return await this.bookService.getBookById(bookID);
  }

  @Get("author/:authorName")
  async getBookByAuthorName(
    @Param("authorName") authorName: string,
  ): Promise<Book[]> {
    return await this.bookService.getBookByAuthorName(authorName);
  }

  @Get("name/:bookName")
  async getBookByName(@Param("bookName") bookName: string): Promise<Book[]> {
    return await this.bookService.getBookByName(bookName);
  }

  @Post()
  async saveBook(@Body() newBook: BookDto): Promise<Book> {
    return await this.bookService.saveBook(newBook);
  }

  @Patch(":bookID")
  async updateBookById(
    @Param("bookID") bookID: ObjectId,
    @Body() newBook: BookDto,
  ): Promise<Book> {
    return await this.bookService.updateBookById(bookID, newBook);
  }

  @Delete(":bookID")
  async deleteBookById(@Param("bookID") bookID: string): Promise<Book> {
    return await this.bookService.deleteBookById(bookID);
  }
}
