import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LaporanBalita = db.define('laporanBalita',{
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
    bulan_pemeriksaan:{
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
    nama:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    nama_orangtua:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    tanggal_lahir:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           isDate: true
        }
    },
    jenis_kelamin:{
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
    berat_badan:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    tinggi_badan:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    lingkar_kepala:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    suhu_tubuh:{
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    detak_jantung:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    status_gizi:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
    status_kesehatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
           len: [3, 50]
        }
    },
},{
    freezeTableName: true
});

export default LaporanBalita;
