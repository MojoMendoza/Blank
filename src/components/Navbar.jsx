import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Navbar({ isLoggedIn, onLogout, userId }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        alert("You have been logged out!");
        navigate("/login");
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navLeft}>
                <Link to="/" style={styles.navLink}>
                    Home
                </Link>
                {isLoggedIn && (
                    <>
                        <Link to="/channels" style={styles.navLink}>
                            Channels
                        </Link>
                        <Link to={`/direct-message/`} style={styles.navLink}>
                            Direct Message
                        </Link>
                    </>
                )}
            </div>
            <div style={styles.navCenter}>
                <Link to="/" style={styles.title}>
                    <h1 style={styles.pageTitle}>Slack Messaging App</h1>
                </Link>
            </div>
            <div style={styles.navRight}>
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" style={styles.navLink}>
                            Login
                        </Link>
                        <Link to="/register" style={styles.navLink}>
                            Register
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={styles.logoutButton}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem 1rem",
        backgroundColor: "#282c34",
        color: "white",
    },
    navLeft: {
        display: "flex",
        gap: "1rem",
    },
    navCenter: {
        flex: 1,
        textAlign: "center",
        order: -1,
    },
    navRight: {
        display: "flex",
        gap: "1rem",
        margin: "0 0 0 1rem",
    },
    pageTitle: {
        margin: 0,
        fontSize: "1.5rem",
        color: "#ffffff",
    },
    navLink: {
        color: "#61dafb",
        textDecoration: "none",
        fontSize: "1rem",
        transition: "color 0.3s",
    },
    logoutButton: {
        backgroundColor: "#61dafb",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        margin: "0 1rem",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background-color 0.3s",
    },
    title: {
        color: "#61dafb",
        textDecoration: "none",
    },
};

export default Navbar;
