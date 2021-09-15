import "./App.css";
import React from "react";
import Books from "./components/books/books";
import NavBar from "./components/common/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/common/notFound";
import Authors from "./components/authors/authors";
import Publishers from "./components/publishers/publishers";
import BooksAdd from "./components/books/booksAdd";
import BooksEdit from "./components/books/booksEdit";
import AuthorsAdd from "./components/authors/authorsAdd";
import AuthorsEdit from "./components/authors/authorsEdit";
import PublishersAdd from "./components/publishers/publishersAdd";
import PublishersEdit from "./components/publishers/publishersEdit";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/books" component={Books} />
          <Route path="/publishers" component={Publishers} />
          <Route path="/authors" component={Authors} />
          <Route path="/booksAdd" component={BooksAdd} />
          <Route path="/authorsAdd" component={AuthorsAdd} />
          <Route path="/publishersAdd" component={PublishersAdd} />
          <Route path="/booksEdit/:id" component={BooksEdit} />
          <Route path="/authorsEdit/:id" component={AuthorsEdit} />
          <Route path="/publishersEdit/:id" component={PublishersEdit} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/books" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
