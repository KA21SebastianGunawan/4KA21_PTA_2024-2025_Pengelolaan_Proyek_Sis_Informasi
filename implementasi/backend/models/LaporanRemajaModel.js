import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LaporanRemaja = db.define('laporanRemaja',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
           notEmpty: true
        }
    },
    rw:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    bulanPemeriksaan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    kategori:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    nik:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    nama:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    tanggalLahir:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           isDate: true
        }
    },
    jenisKelamin:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true
        }
    },
    alamat:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    merokok:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true
        }
    },
    sistol:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    diastol:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    tinggiBadan:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    beratBadan:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    lingkarPerut:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
},{
    freezeTableName: true
});

export default LaporanRemaja;
