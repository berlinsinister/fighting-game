import "./Modal.scss";

const Modal = ({ name, url, isShow }) => {
  return (
    <>
      {isShow ? (
        <div className="overlay">
          <div className="modal-wrapper">
            <a href="/">X</a>
            <h2 className="winner-name">{name} WINS!</h2>
            <div className="winner-img">
              <img src={url} alt="avatar" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
