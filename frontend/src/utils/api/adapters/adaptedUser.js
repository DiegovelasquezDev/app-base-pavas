export const adaptedUser = (response) => {

  const adaptedResponseUser = {
    status: response.status,
    message: response.data.message,
    user: {
      dni: response.data.user.dni,
      firstName: response.data.user.firstName,
      lastName: response.data.user.lastName,
      token: response.data.user.token,
    },
  };
  
  return adaptedResponseUser;
};
