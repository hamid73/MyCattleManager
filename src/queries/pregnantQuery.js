import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='pregnants'",
      [],
      (tx, res) => {
        console.log('exist pregnants item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS pregnants', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS pregnants (id INTEGER PRIMARY KEY AUTOINCREMENT, matingDate TEXT NOT NULL, ' +
              'deliveryDate TEXT NOT NULL, cattleId INTEGER,FOREIGN KEY (cattleId) REFERENCES cattles (id)) ',
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
export const newPregnant = async inputValue => {
  const {matingDate, deliveryDate, semen} = inputValue;
  const NewPregnantAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO pregnants (matingDate,deliveryDate,cattleId) values (?,?,?)',
          [matingDate, deliveryDate, semen],
          (txObj, resultSet) => {
            resolve({
              id: resultSet.insertId,
              matingDate,
              deliveryDate,
              cattleId: semen,
            });
          },
          (txObj, error) => reject('Error', error),
        );
      });
    });
  return await NewPregnantAction().then(result => {
    return result;
  });
};

export const updatePregnant = (name, id, setPregnantesData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE pregnants SET name = ? WHERE id = ?',
      [name, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setPregnantesData(state => [
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

export const deletePregnant = async id => {
  const deletePregnantAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM pregnants WHERE id = ? ',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve({action: true});
            }
          },
          (txObj, error) => console.log('Error', error),
        );
      });
    });

  return await deletePregnantAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('deletePregnant Error', error);
    },
  );
};

export const getPregnantById = async id => {
  //console.log("🚀 ~ file: pregnantsQuery.js:75 ~ getpregnantsByCattleId ~ id", id);
  const getPregnantByIdAction = () =>
    new Promise(resolve => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT * FROM pregnants where id = ?',
          [id], // passing sql query and parameters:null
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
        ); // end executeSQL
      }); // end transaction
    });

  return await getPregnantByIdAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getGroups Error', error);
    },
  );
};
