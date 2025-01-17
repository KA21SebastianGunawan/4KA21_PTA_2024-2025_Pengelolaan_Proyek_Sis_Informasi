import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const LaporanPoswindu = db.define('laporanPoswindu',{
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
    usia_kehamilan:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           notEmpty: true,
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
    detak_jantung_janin:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    lingkar_lengan_atas:{
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    hemoglobin:{
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    protein_urin:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
           notEmpty: true,
        }
    },
    status_kehamilan:{
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

export default LaporanPoswindu;
