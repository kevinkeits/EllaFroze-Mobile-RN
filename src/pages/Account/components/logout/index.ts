import axios from 'axios';

interface LogoutResponse {
  success: boolean;
}

const logout = async (accessToken: string) => {
  try {
    const response = await axios.post<LogoutResponse>('https://ellafroze.com/api/external/doLogout', {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default logout;
