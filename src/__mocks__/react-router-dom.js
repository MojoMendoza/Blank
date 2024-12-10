module.exports = {
    BrowserRouter: ({ children }) => <div>{children}</div>,  // Just a wrapper
    Route: () => null,  // Mock Route
    Link: ({ children }) => <a>{children}</a>, // Mock Link
    useNavigate: jest.fn(),  // Mock useNavigate to avoid actual navigation logic
  };
  