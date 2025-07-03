import { useEffect, useState } from "react";
import { getProfile, updateProfile, updatePassword } from "../services/usersService";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [modalpassword, setModalPassword] = useState(false);
  const [formPassword, setFormPassword] = useState({oldPassword: "", newPassword: "",
  });

  const fetchUser = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error fetching user profile:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // mettre à jour le profil avec les données du formulaire
      const response = await updateProfile(form);
      console.log(response.data);
      // mettre à jour l'état de la modal
      location.reload();
      setShow(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      if (formPassword.oldPassword != formPassword.newPassword) {
        // mettre à jour le password avec les données du formulaire
        const response = await updatePassword(formPassword);
        console.log(response.data);
        // redirection vers la loginPage
        navigate("/login");
      } else {
        alert("password identical to old password!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-center mt-5">
        <h1>Profile</h1>

        <p className="mt-5">
          <strong>Name :</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.mail}
        </p>

        <Button className='m-3' variant="primary" onClick={() => setShow(true)}>
          Modify profile
        </Button>
        <Button variant="primary" onClick={() => setModalPassword(true)}>
          Modify password
        </Button>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={handleUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier mes informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nom d’utilisateur</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.mail}
                onChange={(e) => setForm({ ...form, mail: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={modalpassword} onHide={() => setModalPassword(false)}>
        <Form onSubmit={handleUpdatePassword}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier le mot de passe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Ancien mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={formPassword.oldPassword}
                onChange={(e) =>
                  setFormPassword({
                    ...formPassword,
                    oldPassword: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={formPassword.newPassword}
                onChange={(e) =>
                  setFormPassword({
                    ...formPassword,
                    newPassword: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalPassword(false)}>
              Annuler
            </Button>
            <Button type="submit" variant="primary">
              Enregistrer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ProfilePage;
