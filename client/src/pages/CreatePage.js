import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './../context/auth.context';
import { useHttp } from './../hooks/http.hook';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState('');

  const pressHandler = useCallback(
    async (e) => {
      if (e.key === 'Enter') {
        try {
          const data = await request(
            '/api/link/generate',
            'POST',
            { from: link },
            {
              Authorization: `Bearer ${auth.token}`,
            },
          );
          history.push(`/detail/${data.link._id}`);
        } catch (e) {
          console.error(e);
        }
      }
    },
    [auth.token, link, request, history],
  );

  useEffect(() => global.M.updateTextFields(), []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field ">
          <input
            placeholder="Enter link"
            id="link"
            name="link"
            type="text"
            className="validate"
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
};
