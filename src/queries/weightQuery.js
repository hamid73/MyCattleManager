import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='weight'",
      [],
      (tx, res) => {
        console.log('exist weight item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS weight', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS weight (id INTEGER PRIMARY KEY AUTOINCREMENT' +
              ', result INTEGER NOT NULL)',
            [],
          );
        }
        // tx.executeSql(
        //   "ALTER TABLE cattles ADD COLUMN archive BOLEAN DEFAULT false"
        // );
        //tx.executeSql("DROP TABLE cattles");
      },
      error => {
        console.log(error);
      },
    );
  });

  return db;
};
const db = openDB();
export const newWeight = async inputValue => {
  const {result} = inputValue;
  console.log('🚀 ~ file: weightQuery.js:35 ~ newWeight ~ result', result);
  //const dispatch = useDispatch();

  const newWeightAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO weight (result) values (?)',
          [result],
          (txObj, resultSet) => {
            console.log(resultSet.insertId);
            resolve({id: resultSet.insertId, result});
          },
          (txObj, error) => reject(error),
        );
      });
    });

  return await newWeightAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getGroups Error', error);
    },
  );
};

export const updateWeight = (inputValue, setWeightData, toast) => {
  const {id, result, weightDate} = inputValue;
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE weight SET result = ?,weightDate =? WHERE id = ?',
      [result, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setWeightData(state => [
            ...state,
            state.map(row => (row.id === id ? (row = {...row, result}) : row)),
          ]);
          toast.show('تغییرات اعمال شد.', {type: 'success'});
        }
      },
      (txObj, error) => console.log('Error', error),
    );
  });
};

export const deleteWeight = async id => {
  const deleteWeightAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM breeds WHERE id = ? ',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve({action: true});
            }
          },
          (txObj, error) => reject('Error', error),
        );
      });
    });

  return await deleteWeightAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('deleteWeight Error', error);
    },
  );
};

export const getWeightById = async id => {
  //console.log("🚀 ~ file: weightQuery.js:75 ~ getWeightByCattleId ~ id", id);
  const getWeightByIdAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM weight where id = ?',
          [id], // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp[0]);
          },
        ); // end executeSQL
      }); // end transaction
    });

  return await getWeightByIdAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getGroups Error', error);
    },
  );
};

export const getLastResultWeighed = async cattleId => {
  const getLastResultWeighedAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT weight.*,events.relationId,events.createdAt FROM events INNER JOIN weight ON weight.id = events.relationId' +
            ' WHERE events.cattleId =? ORDER BY events.createdAt DESC',
          [cattleId], // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp[0]);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction
    });

  return await getLastResultWeighedAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getLastResultWeighedAction Error', error);
    },
  );
};
