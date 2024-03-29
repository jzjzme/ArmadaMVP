#pragma once

#include <eosiolib/singleton.hpp>
#include <eosiolib/multi_index.hpp>

namespace identity {

   typedef uint64_t identity_name;
   typedef uint64_t property_name;
   typedef uint64_t property_type_name;

   struct certvalue {
      property_name     property; ///< name of property, base32 encoded i64
      std::string       type; ///< defines type serialized in data
      std::vector<char> data; ///<
      std::string       memo; ///< meta data documenting basis of certification
      uint8_t           confidence = 1; ///< used to define liability for lies,
      /// 0 to delete

      EOSLIB_SERIALIZE( certvalue, (property)(type)(data)(memo)(confidence) )
   };

   struct certrow {
      uint64_t            id;
      property_name       property;
      uint64_t            trusted;
      account_name        certifier;
      uint8_t             confidence = 0;
      std::string         type;
      std::vector<char>   data;
      uint64_t primary_key() const { return id; }
      /* constexpr */ static eosio::key256 key(uint64_t property, uint64_t trusted, uint64_t certifier) {
         /*
           key256 key;
           key.uint64s[0] = property;
           key.uint64s[1] = trusted;
           key.uint64s[2] = certifier;
           key.uint64s[3] = 0;
         */
         return eosio::key256::make_from_word_sequence<uint64_t>(property, trusted, certifier);
      }
      eosio::key256 get_key() const { return key(property, trusted, certifier); }

      EOSLIB_SERIALIZE( certrow , (property)(trusted)(certifier)(confidence)(type)(data)(id) )
   };

   struct trackrow {
      uint64_t            id;
      property_name       property;
      uint64_t            check;
      account_name        oracle;
      std::string         type;
      std::vector<char>   data;
      uint64_t primary_key() const { return id; }
      static eosio::key256 key(uint64_t property, uint64_t oracle) {
         return eosio::key256::make_from_word_sequence<uint64_t>(property, check, oracle);
      }
      eosio::key256 get_key() const { return key(property, check, oracle); }

      EOSLIB_SERIALIZE( trackrow , (property)(check)(oracle)(confidence)(type)(data)(id) )
   };

   struct nodesrow {
      uint64_t     identity;
      account_name owner;

      uint64_t primary_key() const { return identity; }

      EOSLIB_SERIALIZE( nodesrow , (identity)(owner) )
   };

   struct assetrows {
      uint64_t     asset_id;
      account_name owner;

      uint64_t primary_key() const { return asset_id; }

      EOSLIB_SERIALIZE( assetrows , (asset_id)(owner) )
   };


   struct trustrow {
      account_name account;

      uint64_t primary_key() const { return account; }

      EOSLIB_SERIALIZE( trustrow, (account) )
   };

   typedef eosio::multi_index<N(certs), certrow,
                              eosio::indexed_by< N(bytuple), eosio::const_mem_fun<certrow, eosio::key256, &certrow::get_key> >
                              > certs_table;
   typedef eosio::multi_index<N(assets), trackrow,
                              eosio::indexed_by< N(bytuple), eosio::const_mem_fun<certrow, eosio::key256, &certrow::get_key> >
                              > track_table;
   typedef eosio::multi_index<N(ident), nodesrow> nodes_table;
   typedef eosio::multi_index<N(asset), assetrows> assets_table;
   typedef eosio::singleton<N(account), identity_name>  accounts_table;
   typedef eosio::multi_index<N(trust), trustrow> trust_table;

   class armada_base {
      public:
         armada_base( account_name acnt) : _self( acnt ) {}

         bool is_trusted_by( account_name trusted, account_name by );

         bool is_trusted( account_name acnt );

      protected:
         account_name _self;
   };

}

