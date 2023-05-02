import {openDatabase} from 'react-native-sqlite-storage';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='milkRecords'",
      [],
      (tx, res) => {
        console.log('exist milkRecords item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS milkRecords', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS milkRecords (id INTEGER PRIMARY KEY AUTOINCREMENT, milkingDate TEXT ' +
              'NOT NULL, type TEXT NOT NULL, amTotal REAL, noonTotal REAL, pmTotal REAL, numberOfCow INTEGER, totalUsed REAL, milkTotal REAL NOT NULL, note TEXT, cattleId INTEGER)',
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
export const newMilkRecord = async inputValue => {
  const {
    milkingDate,
    type,
    amTotal,
    noonTotal,
    pmTotal,
    totalUsed,
    note,
    cattleId,
    milkTotal,
    numberOfCow,
    mPlaque,
  } = inputValue;
  const newMilkRecordAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO milkRecords (milkingDate,type,amTotal,noonTotal,pmTotal,totalUsed,note,cattleId,milkTotal,numberOfCow) values (?,?,?,?,?,?,?,?,?,?)',
          [
            milkingDate,
            type,
            amTotal,
            noonTotal,
            pmTotal,
            totalUsed,
            note,
            cattleId,
            milkTotal,
            numberOfCow,
          ],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve({
                id: resultSet.insertId,
                milkingDate,
                type,
                amTotal,
                noonTotal,
                pmTotal,
                totalUsed,
                note,
                cattleId,
                milkTotal,
                numberOfCow,
                plaque: mPlaque,
              });
            }
          },

          (txObj, error) => reject('Error', error),
        );
      });
    });
  return await newMilkRecordAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('newMilkRecordAction Error', error);
    },
  );
};

export const updateMilkRecord = (name, id, setmilkRecordsData, toast) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE milkRecords SET name = ? WHERE id = ?',
      [name, id],
      (txObj, resultSet) => {
        if (resultSet.rowsAffected > 0) {
          setmilkRecordsData(state => [
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

export const deleteMilkRecord = async id => {
  const deleteMilkRecordAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM milkRecords WHERE id = ? ',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve(true);
            }
          },
          (txObj, error) => reject('Error', error),
        );
      });
    });

  return await deleteMilkRecordAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('deleteMilkRecord Error', error);
    },
  );
};

export const getMilkRecords = async () => {
  const getMilkRecordsAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql(
          'SELECT milkRecords.*,cattles.plaque FROM milkRecords LEFT JOIN cattles ON cattles.id = cattleId',
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

  return await getMilkRecordsAction().then(result => {
    return result;
  });
};
