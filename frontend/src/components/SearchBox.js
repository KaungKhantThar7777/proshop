import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Boolean(keyword.trim()));
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form inline onSubmit={handleSubmit} className="d-none d-sm-inline">
      <Form.Control
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="m-2"
      />
      <Button type="submit" variant="info">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
