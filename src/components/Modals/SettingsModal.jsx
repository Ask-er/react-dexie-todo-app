import Modal from "../Ui/Modal";
export default function SettingsModal({ show, onCloseButtonClick }) {
  return (
    <Modal
      show={show}
      onCloseButtonClick={onCloseButtonClick}
      className="w-1/2"
    >
      <h1>Settings</h1>
    </Modal>
  );
}
