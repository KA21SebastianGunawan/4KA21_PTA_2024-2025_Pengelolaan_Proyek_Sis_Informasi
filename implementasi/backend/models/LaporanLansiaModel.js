import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LaporanLansia = db.define('laporanLansia',{
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
    jenis_kelamin:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true
        }
    },
    tekanan_darah:{
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
    gula_darah_puasa:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    gula_darah_sesudah_makan:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    kolesterol:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    asam_urat:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
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

export default LaporanLansia;
