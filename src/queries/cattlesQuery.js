import {openDatabase} from 'react-native-sqlite-storage';
import {toEnglishDigits} from '../utility';
import {DBNAME} from '@env';
const openDB = () => {
  const db = openDatabase({name: DBNAME});
  db.transaction(txn => {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='cattles'",
      [],
      (tx, res) => {
        console.log('exist cattles item:', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS cattles', []);
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS cattles (id INTEGER PRIMARY KEY AUTOINCREMENT' +
              ',plaque TEXT NOT NULL,birthDate TEXT,entryDate Text' +
              ',name TEXT,sex BOLEAN NOT NULL, categoryId INTEGER,motherId TEXT,fatherId TEXT,typeObtained TEXT NOT NULL' +
              ',note TEXT,breedsId INTEGER NOT NULL,cattleStage TEXT NOT NULL,status TEXT,archive BOLEAN DEFAULT false' +
              ',FOREIGN KEY (breedsId) REFERENCES breeds (id)' +
              ',FOREIGN KEY (categoryId) REFERENCES categories (id))',
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
export const newCattle = async inputValue => {
  const {
    plaque,
    birthDate,
    entryDate,
    name,
    sex,
    cattleStage,
    categoryId,
    motherId,
    fatherId,
    typeObtained,
    note,
    breedsId,
    weight,
    breedName,
    groupName,
    mPlaque,
    fPlaque,
  } = inputValue;
  const newCattleAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO cattles (plaque,birthDate,entryDate,name,sex,cattleStage,categoryId' +
            ',motherId,fatherId,typeObtained,note,breedsId) values (? ,?,?,?,?,?,?,?,?,?,?,?)',
          [
            toEnglishDigits(plaque),
            birthDate,
            entryDate,
            name,
            sex,
            cattleStage,
            categoryId,
            motherId,
            fatherId,
            typeObtained,
            note,
            breedsId,
          ],
          (txObj, resultSet) => {
            //console.log(resultSet.insertId);
            resolve({
              id: resultSet.insertId,
              plaque,
              birthDate,
              entryDate,
              name,
              sex,
              cattleStage,
              categoryId,
              motherId,
              fatherId,
              typeObtained,
              note,
              breedsId,
              breedName,
              groupName,
              mPlaque,
              fPlaque,
            });
          },
          (txObj, error) => reject(error),
        );
      });
    });
  // weight &&
  //   newWeight({
  //     result: toEnglishDigits(weight),
  //     cattleId: resultSet.insertId,
  //     weightDate: moment.from(new Date()).format("jYYYY/jMM/jDD"),
  //   });

  return await newCattleAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('newCattle Error', error);
    },
  );
};

export const updateCattle = async (inputValue, id) => {
  const editCattleAction = () =>
    new Promise((resolve, reject) => {
      const {
        plaque,
        birthDate,
        entryDate,
        name,
        sex,
        cattleStage,
        categoryId,
        motherId,
        fatherId,
        typeObtained,
        note,
        breedsId,

        breedName,
        groupName,
        mPlaque,
        fPlaque,
      } = inputValue;

      const mId = motherId ? motherId : null;

      const fId = fatherId ? fatherId : null;

      db.transaction(tx => {
        tx.executeSql(
          'UPDATE cattles SET birthDate=?, entryDate=? , name=?, sex=?, cattleStage=?, categoryId=?, motherId=?,' +
            ' fatherId=?, typeObtained=?, note=?, breedsId=? WHERE id = ?',
          [
            birthDate,
            entryDate,
            name,
            sex,
            cattleStage,
            categoryId,
            mId,
            fId,
            typeObtained,
            note,
            breedsId,
            id,
          ],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve({
                id,
                plaque,
                birthDate,
                entryDate,
                name,
                sex,
                cattleStage,
                categoryId,
                motherId: mId,
                fatherId: fId,
                typeObtained,
                note,
                breedsId,

                breedName,
                groupName,
                mPlaque,
                fPlaque,
              });
            }
          },
          (txObj, error) => reject('Error', error),
        );
      });
    });
  return await editCattleAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('newCattle Error', error);
    },
  );
};

export const setArchive = async (id, archive) => {
  const setArchiveAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE cattles SET archive = ? WHERE id = ?',
          [archive, id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve(true);
            }
          },
          (txObj, error) => console.log('Error', error),
        );
      });
    });
  return await setArchiveAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('newCattle Error', error);
    },
  );
};

export const setNewStage = async (id, newStage) => {
  const setNewStageAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE cattles SET cattleStage = ? WHERE id = ?',
          [newStage, id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve(true);
            }
          },
          (txObj, error) => console.log('Error', error),
        );
      });
    });
  return await setNewStageAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('newCattle Error', error);
    },
  );
};
export const setNewStatus = async (id, newStatus) => {
  const setNewStatusAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE cattles SET status = ? WHERE id = ?',
          [newStatus, id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve(true);
            }
          },
          (txObj, error) => console.log('Error', error),
        );
      });
    });
  return await setNewStatusAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('setNewStatus Error', error);
    },
  );
};

export const deleteCattle = async id => {
  const deleteCattleAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM cattles WHERE id = ? ',
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              resolve('DeletedSuccessfully');
            }
          },
          (txObj, error) => console.log('deleteCattle Error', error),
        );
      });
    });
  return await deleteCattleAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('deleteCattle Error', error);
    },
  );
};

export const getCattles = async (archive = false) => {
  const getCattlesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT c.*,breeds.name as breedName,groups.name as groupName,m.plaque as mPlaque,f.plaque as fPlaque FROM cattles c' +
            ' INNER JOIN breeds ON breeds.id = c.breedsId' +
            ' LEFT JOIN groups ON groups.id = c.categoryId' +
            ' LEFT JOIN cattles m ON m.id = c.motherId' +
            ' LEFT JOIN cattles f ON f.id = c.fatherId' +
            ' WHERE c.archive = ? ORDER BY c.plaque ASC',
          [archive],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction

      //return data;
    });

  return await getCattlesAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getCattles Error', error);
    },
  );
};
export const getCattlesByStage = async stage => {
  const getCattlesByStageAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT c.*,breeds.name as breedName,groups.name as groupName,m.plaque as mPlaque,f.plaque as fPlaque FROM cattles c' +
            ' INNER JOIN breeds ON breeds.id = c.breedsId' +
            ' LEFT JOIN groups ON groups.id = c.categoryId' +
            ' LEFT JOIN cattles m ON m.id = c.motherId' +
            ' LEFT JOIN cattles f ON f.id = c.fatherId' +
            ' WHERE c.archive != true AND c.cattleStage = ? ORDER BY c.plaque ASC',
          [stage],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction

      //return data;
    });

  return await getCattlesByStageAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getCattlesByStage Error', error);
    },
  );
};
export const getCattlesByStatus = async status => {
  const getCattlesByStatusAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT c.*,breeds.name as breedName,groups.name as groupName,m.plaque as mPlaque,f.plaque as fPlaque FROM cattles c' +
            ' INNER JOIN breeds ON breeds.id = c.breedsId' +
            ' LEFT JOIN groups ON groups.id = c.categoryId' +
            ' LEFT JOIN cattles m ON m.id = c.motherId' +
            ' LEFT JOIN cattles f ON f.id = c.fatherId' +
            ' WHERE c.archive != true AND c.status=? ORDER BY c.plaque ASC',
          [status],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction

      //return data;
    });

  return await getCattlesByStatusAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getCattlesByStatus Error', error);
    },
  );
};
export const searchCattle = async value => {
  const searchCattleAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT c.*,breeds.name as breedName,groups.name as groupName,m.plaque as mPlaque,f.plaque as fPlaque FROM cattles c' +
            ' INNER JOIN breeds ON breeds.id = c.breedsId' +
            ' LEFT JOIN groups ON groups.id = c.categoryId' +
            ' LEFT JOIN cattles m ON m.id = c.motherId' +
            ' LEFT JOIN cattles f ON f.id = c.fatherId' +
            ' WHERE c.archive != true AND  c.plaque like ? OR c.name like ? ORDER BY c.plaque ASC',
          ['%' + toEnglishDigits(value) + '%', '%' + value + '%'],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction

      //return data;
    });

  return await searchCattleAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('searchCattle Error', error);
    },
  );
};

export const getCattlesByGender = async (sex, archive = false) => {
  const getCattlesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM cattles where sex = ? AND archive = ?',
          [sex, archive],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction

      //return data;
    });

  return await getCattlesAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getCattlesByGender Error', error);
    },
  );
};

export const getCattlesOffspring = async id => {
  const getCattlesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT c.*,breeds.name as breedName,groups.name as groupName,m.plaque as mPlaque,f.plaque as fPlaque FROM cattles c' +
            ' INNER JOIN breeds ON breeds.id = c.breedsId' +
            ' LEFT JOIN groups ON groups.id = c.categoryId' +
            ' LEFT JOIN cattles m ON m.id = c.motherId' +
            ' LEFT JOIN cattles f ON f.id = c.fatherId' +
            ' where c.motherId = ? OR c.fatherId = ? ORDER BY c.plaque ASC',
          [id, id],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction
      //return data;
    });

  return await getCattlesAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getCattlesOffspring Error', error);
    },
  );
};

export const getCattleByPlaque = async (plaque, archive = false) => {
  const getCattlesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT c.*,breeds.name as breedName,groups.name as groupName,m.plaque as mPlaque,f.plaque as fPlaque FROM cattles c' +
            ' INNER JOIN breeds ON breeds.id = c.breedsId' +
            ' LEFT JOIN groups ON groups.id = c.categoryId' +
            ' LEFT JOIN cattles m ON m.id = c.motherId' +
            ' LEFT JOIN cattles f ON f.id = c.fatherId' +
            ' where c.plaque = ? AND c.archive = ? ORDER BY c.plaque ASC',
          [plaque, archive],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction

      //return data;
    });

  return await getCattlesAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getCattleByPlaque Error', error);
    },
  );
};

export const getCattleById = async id => {
  const getCattlesAction = () =>
    new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT c.*,breeds.name as breedName,groups.name as groupName,m.plaque as mPlaque,f.plaque as fPlaque FROM cattles c' +
            ' INNER JOIN breeds ON breeds.id = c.breedsId' +
            ' LEFT JOIN groups ON groups.id = c.categoryId' +
            ' LEFT JOIN cattles m ON m.id = c.motherId' +
            ' LEFT JOIN cattles f ON f.id = c.fatherId' +
            ' where c.id = ? ORDER BY c.plaque ASC',
          [id],
          (txObj, rows) => {
            var temp = [];
            for (let i = 0; i < rows.rows.length; ++i)
              temp.push(rows.rows.item(i));

            resolve(temp[0]);
          },
          (txObj, error) => reject(error),
        ); // end executeSQL
      }); // end transaction

      //return data;
    });

  return await getCattlesAction().then(
    result => {
      return result;
    },
    function (error) {
      console.log('getCattleById Error', error);
    },
  );
};
