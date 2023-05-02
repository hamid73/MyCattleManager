import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='groups'",
      [],
      (tx, res) => {
        console.log('exist groups item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS groups', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)',
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
export const newGroup = async name => {
  const newGroupAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO groups (name) values (?)',
          [name],
          (txObj, resultSet) => {
            resolve({id: resultSet.insertId, name: name});
          },

          (txObj, error) => reject(error),
        );
      });
    });

  return await newGroupAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getGroups Error', error);
    },
  );
};

export const updateGroup = (name, id, setGroupsData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE groups SET name = ? WHERE id = ?',
      [name, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setGroupsData(state => [
            ...state,
            state.map(row => (row.id === id ? (row = {...row, name}) : row)),
          ]);
          toast.show('تغییرات اعمال شد.', {type: 'success'});
        }
      },
      (txObj, error) => console.log('Error', error),
    );
  });
};

export const deleteGroup = (id, setGroupsData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM groups WHERE id = ? ',
      [id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setGroupsData(state => [
            ...state,
            state.filter(item => item.id !== id),
          ]);
          toast.show('گروه انتخاب شده حذف شد.', {type: 'success'});
        }
      },
      (txObj, error) => console.log('Error', error),
    );
  });
};

export const getGroups = async () => {
  const getGroupsAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM groups',
          null, // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
        ); // end executeSQL
      }); // end transaction
    });

  return await getGroupsAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getGroups Error', error);
    },
  );
};
