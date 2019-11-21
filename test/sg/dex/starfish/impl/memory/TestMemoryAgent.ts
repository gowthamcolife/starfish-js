import 'mocha'
import * as assert from "assert"
import DID from '../../../../../../src/sg/dex/starfish/util/DID';
import MemoryAgent from '../../../../../../src/sg/dex/starfish/impl/memory/MemoryAgent';
import MemoryAsset from '../../../../../../src/sg/dex/starfish/impl/memory/MemoryAsset';
import Asset from '../../../../../../src/sg/dex/starfish/main/Asset';


describe('testAgentID', () => {
  
    it('testAgentID', () => {
     
        let did:DID=DID.parse(DID.createRandomString());
        let ma:MemoryAgent=MemoryAgent.create(did);
        assert.equal(did,ma.getDID());
    });
  
  });


  describe('testRegisterUpload', () => {
  
    it('testRegisterUpload', () => {
     
        let agent1:MemoryAgent=MemoryAgent.create();
        let agent2:MemoryAgent=MemoryAgent.create();
        const data:number[]=[1,2,3]
        let a:MemoryAsset=MemoryAsset.create(data,null,null);
        let id:string=a.getAssetID();
        assert.equal(agent1.getAsset(id),null)
        let a1:Asset=agent1.uploadAsset(a);
        assert.deepEqual(data,a1.getContent());
        assert.equal(a1.getAssetID(),a.getAssetID());
        assert.equal(a1,agent1.getAsset(id))
        assert.equal(agent2.getAsset(id),null)
        let a2:Asset=agent2.uploadAsset(a1);
        assert.notEqual(agent2.getAsset(id),null)
        assert.equal(a1.getMetadataString(),a2.getMetadataString())
        assert.deepEqual(data,a2.getContent())
        
      
    });
  
  });


  describe('testUpload', () => {
  
    it('testUpload', () => {
        const data:number[]=[1,2,3]
        let memoryAgent:MemoryAgent=MemoryAgent.create();
		let asset:MemoryAsset = MemoryAsset.create(data,null,null);
		let uploadAsset:Asset=memoryAgent.uploadAsset(asset);
		assert.notEqual(memoryAgent.getAsset(asset.getAssetID()),null);
		assert.equal(asset.getMetadataString(),uploadAsset.getMetadataString());
    });
  
});



describe('testRegister', () => {
  
    it('testRegister', () => {
        const data:number[]=[3,5,6,7,8,9]
        let agent1:MemoryAgent=MemoryAgent.create();
		let asset:MemoryAsset = MemoryAsset.create(data,null,null);
		let id:string  = asset.getAssetID();
		let registeredAsset:Asset=agent1.registerAsset(asset);
		assert.notEqual(agent1.getAsset(id),null);
		assert.equal(asset.getMetadataString(),registeredAsset.getMetadataString());
    });
  
});


describe('testGetAsset', () => {
  
    it('testGetAsset', () => {
        const data:number[]=[3,5,6,7,8,9]
        let agent1:MemoryAgent=MemoryAgent.create();
		let asset:MemoryAsset = MemoryAsset.create(data,null,null);
		let id:string  = asset.getAssetID();
		agent1.registerAsset(asset);
		let assetFromAgent:Asset=agent1.getAsset(id);
		assert.equal(assetFromAgent,asset);
    });
  
});



/* describe('testGetAssetByDID', () => {
  
    it('testGetAssetByDID', () => {
        const data:number[]=[3,5,6,7,8,9]
        let  did:DID =DID.createRandom();
		let agent1:MemoryAgent=MemoryAgent.create(did.toString());
        let asset:MemoryAsset = MemoryAsset.create(data,null,null);
        let id:string  = asset.getAssetID();
		assert.equal(64,id.length);
	
		agent1.registerAsset(asset);
		let assetFromAgent:Asset=agent1.getAsset(did.getID());
		assert.equal(assetFromAgent,asset);
    });
  
}); */