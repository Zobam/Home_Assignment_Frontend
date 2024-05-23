import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user }) {
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return children;
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
