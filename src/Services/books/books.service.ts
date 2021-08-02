import { BadRequestException, Injectable } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { BookDto } from "src/DTO/books.dto";
import { Book } from "src/Mongo/Interfaces/book.interface";
import { BookRepository } from "src/Mongo/Repository/book.repository";

//TODA LÓGICA É FEITA AQUI

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) { }

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();

    if (!allBooks.length)
      throw new BadRequestException("There are no books registered yet");

    return allBooks;
  }

  async getBookById(bookID: ObjectId): Promise<Book> {
    try {
      const existBook = await this.bookRepository.getBookById(bookID);

      if (!existBook) throw new BadRequestException("There are no results");

      return existBook;
    } catch (error) {
      throw new BadRequestException("There are no results");
    }
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]> {
    const splitedAuthorName = authorName.split(" ");

    const foundBooks = await this.bookRepository.getBookByAuthorName(
      splitedAuthorName,
    );

    if (!foundBooks.length)
      throw new BadRequestException("No results for this author");

    return foundBooks;
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if (!foundBooks.length)
      throw new BadRequestException("No results for this name");

    return foundBooks;
  }

  async saveBook(newBook: BookDto): Promise<Book> {
    return await this.bookRepository.saveBook(newBook);
  }

  async deleteBookById(bookID: string): Promise<Book> {
    try {
      const existBook = await this.bookRepository.deleteBookById(bookID);

      if (!existBook)
        throw new BadRequestException(
          "This book does not exist. Try again with another ID",
        );

      return existBook;
    } catch (error) {
      throw new BadRequestException(
        "This book does not exist. Try again with another ID",
      );
    }
  }

  async updateBookById(bookID: ObjectId, newBook: BookDto): Promise<Book> {
    const existBook = await this.bookRepository.getBookById(bookID);

    if (!existBook)
      throw new BadRequestException("There no results with this ID");

    const updateBook = await this.bookRepository.updateBookById(
      bookID,
      newBook,
    );

    if (updateBook) return await this.bookRepository.getBookById(bookID);
    else throw new BadRequestException("Error in update");
  }
}
