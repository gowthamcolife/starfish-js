import 'mocha'
import MemoryAsset from '../../../../../../src/sg/dex/starfish/impl/memory/MemoryAsset'
import Asset from '../../../../../../src/sg/dex/starfish/main/Asset';
import ByteArray from '../../../../../../src/sg/dex/starfish/util/ByteArray'
import * as constant from '../../../../../../src/sg/dex/starfish/constant/constant'
import * as assert from "assert"
import { keccak256 } from 'js-sha3';
import DID from '../../../../../../src/sg/dex/starfish/util/DID';


const memoryAssetData:number[]=[1,2,3]

let memoryAsset:MemoryAsset = MemoryAsset.create(memoryAssetData,null,null);
describe('testCreation', () => {
  
  const SIZE:number = 10
  let data = new Array<number>(SIZE);
  it('testCreation', () => {
   
    let a:MemoryAsset = MemoryAsset.create(data,null,null);
    assert.equal(SIZE,a.getContentSize());

    assert.equal(SIZE.toString(),JSON.parse(a.getMetadataString()).size)

    assert.equal(keccak256(data),JSON.parse(a.getMetadataString()).contentHash)
  });

});



describe('testDID', () => {
  
  const data:number[]=[1,2,3]
  let a:Asset = MemoryAsset.create(data,null,null)
  it('testDID', () => {

   
    try {
      let did:DID=a.getAssetDID();
      assert.fail("Should not succeed! Got: "+did)
    } catch (error) {
      
    }
   
  });

});

describe('testBuildMetaData', () => {
    const data:number[]=[1,2,3]
    let metaMap:Map<string,string> = new Map<string,string>();
    metaMap.set("test1","success")
    it('testBuildMetaData', () => {
      let result:Asset = MemoryAsset.create(data,null,metaMap);
      console.log(result)
      assert.equal(JSON.parse(result.getMetadataString()).test1,"success")
    });
  
  });


  describe('testCreateAsset', () => {
    it('testCreateAsset', () => {
      MemoryAsset.create(null,memoryAsset,null);
      assert.notEqual(memoryAsset.getAssetID(),null)
      assert.notEqual(memoryAsset.getContentSize(),null)
      assert.notEqual(memoryAsset.getContent(),null)
      assert.deepEqual(memoryAsset.getContent(),[1,2,3])
    });
  
  });


  describe('testgetContent', () => {
    it('testgetContent', () => {
      let memoryAsset:MemoryAsset=MemoryAsset.create(ByteArray.utf8Array("Test get Content"),null,null);
      assert.notEqual(memoryAsset.getContent(),null)
      assert.deepEqual(ByteArray.utf8Array("Test get Content"),memoryAsset.getContent())
    });
  
  });


  describe('testgetContentSize', () => {
    it('testgetContentSize', () => {
      let memoryAsset:MemoryAsset=MemoryAsset.create(ByteArray.utf8Array("Test Content Size"),null,null);
      assert.notEqual(memoryAsset.getContent(),null)
      assert.notEqual(memoryAsset.getContentSize(),null)
      assert.deepEqual(memoryAsset.getContentSize(),"Test Content Size".length)
    });
  
  });


   
describe('testgetParamValue', () => {

  it('testgetParamValue', () => {
    let memoryAsset:MemoryAsset=MemoryAsset.create(ByteArray.utf8Array("Test Content Size"),null,null);
    let expected:string=memoryAsset.getParamValue().get(constant.Constant.ID).toString()
    let actual:string=memoryAsset.getAssetID();

    assert.equal(expected,actual)
  });

});