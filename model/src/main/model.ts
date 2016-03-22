import { org as kmf } from './kmf';

export namespace org {
  export namespace impl {
    export class KevoreeViewImpl extends kmf.kevoree.modeling.abs.AbstractKView implements org.KevoreeView {
      constructor(p_universe: number, _time: number, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager) {
        super(p_universe, _time, p_manager);
      }
      public createPortType(): org.kevoree.PortType {
        return <org.kevoree.PortType>this.create(org.kevoree.meta.MetaPortType.getInstance());
      }
      public createNode(): org.kevoree.Node {
        return <org.kevoree.Node>this.create(org.kevoree.meta.MetaNode.getInstance());
      }
      public createPort(): org.kevoree.Port {
        return <org.kevoree.Port>this.create(org.kevoree.meta.MetaPort.getInstance());
      }
      public createMinConstraint(): org.kevoree.MinConstraint {
        return <org.kevoree.MinConstraint>this.create(org.kevoree.meta.MetaMinConstraint.getInstance());
      }
      public createNodeType(): org.kevoree.NodeType {
        return <org.kevoree.NodeType>this.create(org.kevoree.meta.MetaNodeType.getInstance());
      }
      public createOutputPort(): org.kevoree.OutputPort {
        return <org.kevoree.OutputPort>this.create(org.kevoree.meta.MetaOutputPort.getInstance());
      }
      public createListParamType(): org.kevoree.ListParamType {
        return <org.kevoree.ListParamType>this.create(org.kevoree.meta.MetaListParamType.getInstance());
      }
      public createValue(): org.kevoree.Value {
        return <org.kevoree.Value>this.create(org.kevoree.meta.MetaValue.getInstance());
      }
      public createMultilineConstraint(): org.kevoree.MultilineConstraint {
        return <org.kevoree.MultilineConstraint>this.create(org.kevoree.meta.MetaMultilineConstraint.getInstance());
      }
      public createNamespace(): org.kevoree.Namespace {
        return <org.kevoree.Namespace>this.create(org.kevoree.meta.MetaNamespace.getInstance());
      }
      public createNumberParam(): org.kevoree.NumberParam {
        return <org.kevoree.NumberParam>this.create(org.kevoree.meta.MetaNumberParam.getInstance());
      }
      public createDeployUnit(): org.kevoree.DeployUnit {
        return <org.kevoree.DeployUnit>this.create(org.kevoree.meta.MetaDeployUnit.getInstance());
      }
      public createStringParamType(): org.kevoree.StringParamType {
        return <org.kevoree.StringParamType>this.create(org.kevoree.meta.MetaStringParamType.getInstance());
      }
      public createChannel(): org.kevoree.Channel {
        return <org.kevoree.Channel>this.create(org.kevoree.meta.MetaChannel.getInstance());
      }
      public createDictionaryType(): org.kevoree.DictionaryType {
        return <org.kevoree.DictionaryType>this.create(org.kevoree.meta.MetaDictionaryType.getInstance());
      }
      public createComponent(): org.kevoree.Component {
        return <org.kevoree.Component>this.create(org.kevoree.meta.MetaComponent.getInstance());
      }
      public createStringParam(): org.kevoree.StringParam {
        return <org.kevoree.StringParam>this.create(org.kevoree.meta.MetaStringParam.getInstance());
      }
      public createMaxConstraint(): org.kevoree.MaxConstraint {
        return <org.kevoree.MaxConstraint>this.create(org.kevoree.meta.MetaMaxConstraint.getInstance());
      }
      public createConnectorType(): org.kevoree.ConnectorType {
        return <org.kevoree.ConnectorType>this.create(org.kevoree.meta.MetaConnectorType.getInstance());
      }
      public createConnector(): org.kevoree.Connector {
        return <org.kevoree.Connector>this.create(org.kevoree.meta.MetaConnector.getInstance());
      }
      public createModel(): org.kevoree.Model {
        return <org.kevoree.Model>this.create(org.kevoree.meta.MetaModel.getInstance());
      }
      public createDictionary(): org.kevoree.Dictionary {
        return <org.kevoree.Dictionary>this.create(org.kevoree.meta.MetaDictionary.getInstance());
      }
      public createFragmentDictionary(): org.kevoree.FragmentDictionary {
        return <org.kevoree.FragmentDictionary>this.create(org.kevoree.meta.MetaFragmentDictionary.getInstance());
      }
      public createPreferedVersion(): org.kevoree.PreferedVersion {
        return <org.kevoree.PreferedVersion>this.create(org.kevoree.meta.MetaPreferedVersion.getInstance());
      }
      public createElement(): org.kevoree.Element {
        return <org.kevoree.Element>this.create(org.kevoree.meta.MetaElement.getInstance());
      }
      public createListParam(): org.kevoree.ListParam {
        return <org.kevoree.ListParam>this.create(org.kevoree.meta.MetaListParam.getInstance());
      }
      public createItem(): org.kevoree.Item {
        return <org.kevoree.Item>this.create(org.kevoree.meta.MetaItem.getInstance());
      }
      public createStorageInfo(): org.kevoree.StorageInfo {
        return <org.kevoree.StorageInfo>this.create(org.kevoree.meta.MetaStorageInfo.getInstance());
      }
      public createBooleanParamType(): org.kevoree.BooleanParamType {
        return <org.kevoree.BooleanParamType>this.create(org.kevoree.meta.MetaBooleanParamType.getInstance());
      }
      public createChoiceParamType(): org.kevoree.ChoiceParamType {
        return <org.kevoree.ChoiceParamType>this.create(org.kevoree.meta.MetaChoiceParamType.getInstance());
      }
      public createNumberParamType(): org.kevoree.NumberParamType {
        return <org.kevoree.NumberParamType>this.create(org.kevoree.meta.MetaNumberParamType.getInstance());
      }
      public createBooleanParam(): org.kevoree.BooleanParam {
        return <org.kevoree.BooleanParam>this.create(org.kevoree.meta.MetaBooleanParam.getInstance());
      }
      public createChannelType(): org.kevoree.ChannelType {
        return <org.kevoree.ChannelType>this.create(org.kevoree.meta.MetaChannelType.getInstance());
      }
      public createComponentType(): org.kevoree.ComponentType {
        return <org.kevoree.ComponentType>this.create(org.kevoree.meta.MetaComponentType.getInstance());
      }
      public createInputPort(): org.kevoree.InputPort {
        return <org.kevoree.InputPort>this.create(org.kevoree.meta.MetaInputPort.getInstance());
      }
    }
  }
  export class KevoreeUniverse extends kmf.kevoree.modeling.abs.AbstractKUniverse<org.KevoreeView, org.KevoreeUniverse> {
    constructor(p_key: number, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager) {
      super(p_key, p_manager);
    }
    public internal_create(timePoint: number): org.KevoreeView {
      return new org.impl.KevoreeViewImpl(this._universe, timePoint, this._manager);
    }
  }
  export namespace kevoree {
    export import modeling = kmf.kevoree.modeling;
    export interface FragmentDictionary extends kmf.kevoree.modeling.KObject, org.kevoree.Dictionary {
      getName(): string;
      setName(p_obj: string): org.kevoree.FragmentDictionary;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addParams(p_obj: org.kevoree.Param): org.kevoree.FragmentDictionary;
      removeParams(p_obj: org.kevoree.Param): org.kevoree.FragmentDictionary;
      getParams(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Param[]>): void;
      sizeOfParams(): number;
    }
    export interface ParamType extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getFragment(): boolean;
      setFragment(p_obj: boolean): org.kevoree.ParamType;
      getName(): string;
      setName(p_obj: string): org.kevoree.ParamType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.ParamType;
      getRequired(): boolean;
      setRequired(p_obj: boolean): org.kevoree.ParamType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.ParamType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ParamType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ParamType;
      removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ParamType;
      getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void;
      sizeOfConstraints(): number;
    }
    export interface Model extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Model;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Model;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addNodes(p_obj: org.kevoree.Node): org.kevoree.Model;
      removeNodes(p_obj: org.kevoree.Node): org.kevoree.Model;
      getNodes(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void;
      sizeOfNodes(): number;
      addChannels(p_obj: org.kevoree.Channel): org.kevoree.Model;
      removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Model;
      getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void;
      sizeOfChannels(): number;
      addStorage(p_obj: org.kevoree.StorageInfo): org.kevoree.Model;
      removeStorage(p_obj: org.kevoree.StorageInfo): org.kevoree.Model;
      getStorage(cb: kmf.kevoree.modeling.KCallback<org.kevoree.StorageInfo[]>): void;
      sizeOfStorage(): number;
      addNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model;
      removeNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model;
      getNamespaces(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Namespace[]>): void;
      sizeOfNamespaces(): number;
    }
    export interface DeployUnit extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.DeployUnit;
      getVersion(): string;
      setVersion(p_obj: string): org.kevoree.DeployUnit;
      getPlatform(): string;
      setPlatform(p_obj: string): org.kevoree.DeployUnit;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface NumberParam extends kmf.kevoree.modeling.KObject, org.kevoree.Param {
      getName(): string;
      setName(p_obj: string): org.kevoree.NumberParam;
      getValue(): string;
      setValue(p_obj: string): org.kevoree.NumberParam;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParam;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParam;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addType(p_obj: org.kevoree.ParamType): org.kevoree.NumberParam;
      removeType(p_obj: org.kevoree.ParamType): org.kevoree.NumberParam;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void;
      sizeOfType(): number;
    }
    export interface BooleanParam extends kmf.kevoree.modeling.KObject, org.kevoree.Param {
      getName(): string;
      setName(p_obj: string): org.kevoree.BooleanParam;
      getValue(): boolean;
      setValue(p_obj: boolean): org.kevoree.BooleanParam;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParam;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParam;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addType(p_obj: org.kevoree.ParamType): org.kevoree.BooleanParam;
      removeType(p_obj: org.kevoree.ParamType): org.kevoree.BooleanParam;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void;
      sizeOfType(): number;
    }
    export interface Value extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.Value;
      getValue(): string;
      setValue(p_obj: string): org.kevoree.Value;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Value;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Value;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface DictionaryType extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.DictionaryType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.DictionaryType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addParams(p_obj: org.kevoree.ParamType): org.kevoree.DictionaryType;
      removeParams(p_obj: org.kevoree.ParamType): org.kevoree.DictionaryType;
      getParams(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void;
      sizeOfParams(): number;
    }
    export interface ChannelType extends kmf.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
      getName(): string;
      setName(p_obj: string): org.kevoree.ChannelType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.ChannelType;
      getRemote(): boolean;
      setRemote(p_obj: boolean): org.kevoree.ChannelType;
      getFragmentable(): boolean;
      setFragmentable(p_obj: boolean): org.kevoree.ChannelType;
      getVersion(): number;
      setVersion(p_obj: number): org.kevoree.ChannelType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ChannelType;
      removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ChannelType;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void;
      sizeOfDictionary(): number;
      addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType;
      removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType;
      getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void;
      sizeOfDeployUnits(): number;
      addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ChannelType;
      removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ChannelType;
      getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void;
      sizeOfPreferedVersions(): number;
    }
    export interface ChoiceParamType extends kmf.kevoree.modeling.KObject, org.kevoree.ParamType {
      getDefault(): string;
      setDefault(p_obj: string): org.kevoree.ChoiceParamType;
      getFragment(): boolean;
      setFragment(p_obj: boolean): org.kevoree.ChoiceParamType;
      getName(): string;
      setName(p_obj: string): org.kevoree.ChoiceParamType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.ChoiceParamType;
      getRequired(): boolean;
      setRequired(p_obj: boolean): org.kevoree.ChoiceParamType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.ChoiceParamType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ChoiceParamType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addChoices(p_obj: org.kevoree.Item): org.kevoree.ChoiceParamType;
      removeChoices(p_obj: org.kevoree.Item): org.kevoree.ChoiceParamType;
      getChoices(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Item[]>): void;
      sizeOfChoices(): number;
      addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ChoiceParamType;
      removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ChoiceParamType;
      getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void;
      sizeOfConstraints(): number;
    }
    export interface Namespace extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.Namespace;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Namespace;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Namespace;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace;
      removeTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace;
      getTypeDefinitions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void;
      sizeOfTypeDefinitions(): number;
    }
    export interface Component extends kmf.kevoree.modeling.KObject, org.kevoree.Instance {
      getName(): string;
      setName(p_obj: string): org.kevoree.Component;
      getStarted(): boolean;
      setStarted(p_obj: boolean): org.kevoree.Component;
      addOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Component;
      removeOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Component;
      getOutputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.OutputPort[]>): void;
      sizeOfOutputs(): number;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Component;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Component;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Component;
      removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Component;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void;
      sizeOfDictionary(): number;
      addInputs(p_obj: org.kevoree.InputPort): org.kevoree.Component;
      removeInputs(p_obj: org.kevoree.InputPort): org.kevoree.Component;
      getInputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.InputPort[]>): void;
      sizeOfInputs(): number;
      addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Component;
      removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Component;
      getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void;
      sizeOfTypeDefinition(): number;
      addHost(p_obj: org.kevoree.Node): org.kevoree.Component;
      removeHost(p_obj: org.kevoree.Node): org.kevoree.Component;
      getHost(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void;
      sizeOfHost(): number;
    }
    export interface MultilineConstraint extends kmf.kevoree.modeling.KObject, org.kevoree.AbstractConstraint {
      getValue(): boolean;
      setValue(p_obj: boolean): org.kevoree.MultilineConstraint;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.MultilineConstraint;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.MultilineConstraint;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface Instance extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.Instance;
      getStarted(): boolean;
      setStarted(p_obj: boolean): org.kevoree.Instance;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Instance;
      removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Instance;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void;
      sizeOfDictionary(): number;
      addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Instance;
      removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Instance;
      getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void;
      sizeOfTypeDefinition(): number;
    }
    export interface AbstractConstraint extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.AbstractConstraint;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.AbstractConstraint;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface NodeType extends kmf.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
      getName(): string;
      setName(p_obj: string): org.kevoree.NodeType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.NodeType;
      getVersion(): number;
      setVersion(p_obj: number): org.kevoree.NodeType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.NodeType;
      removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.NodeType;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void;
      sizeOfDictionary(): number;
      addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType;
      removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType;
      getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void;
      sizeOfDeployUnits(): number;
      addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.NodeType;
      removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.NodeType;
      getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void;
      sizeOfPreferedVersions(): number;
    }
    export interface NumberType extends kmf.kevoree.modeling.meta.KLiteral {
    }
    export namespace meta {
      export class MetaListParamType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaListParamType = null;
        public static ATT_FRAGMENT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("fragment", 0, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("required", 3, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 4, true, 1, "op_ListParamType_metaData", 36, -1);
        public static REL_OP_PARAM_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Param_type", 5, false, 26, "type", 36, -1);
        public static REL_DEFAULT: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("default", 6, true, 31, "op_ListParamType_default", 36, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 17, "params", 36, -1);
        public static REL_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("constraints", 8, true, 25, "op_ListParamType_constraints", 36, -1);
        public static getInstance(): org.kevoree.meta.MetaListParamType {
          if (org.kevoree.meta.MetaListParamType.INSTANCE == null) {
            org.kevoree.meta.MetaListParamType.INSTANCE = new org.kevoree.meta.MetaListParamType();
          }
          return org.kevoree.meta.MetaListParamType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.ListParamType", 36, null, new Int32Array([24]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(4 + 5 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaListParamType.ATT_FRAGMENT;
          temp_all[1] = org.kevoree.meta.MetaListParamType.ATT_NAME;
          temp_all[2] = org.kevoree.meta.MetaListParamType.ATT_DESCRIPTION;
          temp_all[3] = org.kevoree.meta.MetaListParamType.ATT_REQUIRED;
          temp_all[4] = org.kevoree.meta.MetaListParamType.REL_METADATA;
          temp_all[5] = org.kevoree.meta.MetaListParamType.REL_OP_PARAM_TYPE;
          temp_all[6] = org.kevoree.meta.MetaListParamType.REL_DEFAULT;
          temp_all[7] = org.kevoree.meta.MetaListParamType.REL_OP_DICTIONARYTYPE_PARAMS;
          temp_all[8] = org.kevoree.meta.MetaListParamType.REL_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaDictionary extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaDictionary = null;
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 0, true, 1, "op_Dictionary_metaData", 9, -1);
        public static REL_OP_COMPONENT_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_dictionary", 1, false, 10, "dictionary", 9, -1);
        public static REL_OP_NODE_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_dictionary", 2, false, 4, "dictionary", 9, -1);
        public static REL_OP_INSTANCE_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_dictionary", 3, false, 7, "dictionary", 9, -1);
        public static REL_OP_CHANNEL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_dictionary", 4, false, 5, "dictionary", 9, -1);
        public static REL_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("params", 5, true, 26, "op_Dictionary_params", 9, -1);
        public static getInstance(): org.kevoree.meta.MetaDictionary {
          if (org.kevoree.meta.MetaDictionary.INSTANCE == null) {
            org.kevoree.meta.MetaDictionary.INSTANCE = new org.kevoree.meta.MetaDictionary();
          }
          return org.kevoree.meta.MetaDictionary.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Dictionary", 9, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(0 + 6 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaDictionary.REL_METADATA;
          temp_all[1] = org.kevoree.meta.MetaDictionary.REL_OP_COMPONENT_DICTIONARY;
          temp_all[2] = org.kevoree.meta.MetaDictionary.REL_OP_NODE_DICTIONARY;
          temp_all[3] = org.kevoree.meta.MetaDictionary.REL_OP_INSTANCE_DICTIONARY;
          temp_all[4] = org.kevoree.meta.MetaDictionary.REL_OP_CHANNEL_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaDictionary.REL_PARAMS;
          this.init(temp_all);
        }
      }
      export class MetaValue extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaValue = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OP_FRAGMENTDICTIONARY_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_FragmentDictionary_metaData", 2, false, 14, "metaData", 1, -1);
        public static REL_OP_DEPLOYUNIT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DeployUnit_metaData", 3, false, 18, "metaData", 1, -1);
        public static REL_OP_NODETYPE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_NodeType_metaData", 4, false, 20, "metaData", 1, -1);
        public static REL_OP_INSTANCE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_metaData", 5, false, 7, "metaData", 1, -1);
        public static REL_OP_STORAGEINFO_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_StorageInfo_metaData", 6, false, 3, "metaData", 1, -1);
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 7, true, 1, "op_Value_metaData", 1, -1);
        public static REL_OP_PORTTYPE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_PortType_metaData", 8, false, 16, "metaData", 1, -1);
        public static REL_OP_TYPEDEFINITION_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_TypeDefinition_metaData", 9, false, 8, "metaData", 1, -1);
        public static REL_OP_PARAM_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Param_metaData", 10, false, 26, "metaData", 1, -1);
        public static REL_OP_VALUE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Value_metaData", 11, false, 1, "metaData", 1, -1);
        public static REL_OP_MAXCONSTRAINT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_MaxConstraint_metaData", 12, false, 38, "metaData", 1, -1);
        public static REL_OP_MINCONSTRAINT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_MinConstraint_metaData", 13, false, 37, "metaData", 1, -1);
        public static REL_OP_ABSTRACTCONSTRAINT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_AbstractConstraint_metaData", 14, false, 25, "metaData", 1, -1);
        public static REL_OP_DICTIONARYTYPE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DictionaryType_metaData", 15, false, 17, "metaData", 1, -1);
        public static REL_OP_PORT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Port_metaData", 16, false, 15, "metaData", 1, -1);
        public static REL_OP_COMPONENT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_metaData", 17, false, 10, "metaData", 1, -1);
        public static REL_OP_STRINGPARAMTYPE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_StringParamType_metaData", 18, false, 32, "metaData", 1, -1);
        public static REL_OP_MODEL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Model_metaData", 19, false, 2, "metaData", 1, -1);
        public static REL_OP_PORTTYPE_PROTOCOL: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_PortType_protocol", 20, false, 16, "protocol", 1, -1);
        public static REL_OP_PARAMTYPE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ParamType_metaData", 21, false, 24, "metaData", 1, -1);
        public static REL_OP_DICTIONARY_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Dictionary_metaData", 22, false, 9, "metaData", 1, -1);
        public static REL_OP_LISTPARAMTYPE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ListParamType_metaData", 23, false, 36, "metaData", 1, -1);
        public static REL_OP_NAMESPACE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Namespace_metaData", 24, false, 6, "metaData", 1, -1);
        public static REL_OP_PREFEREDVERSION_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_PreferedVersion_metaData", 25, false, 19, "metaData", 1, -1);
        public static REL_OP_MULTILINECONSTRAINT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_MultilineConstraint_metaData", 26, false, 39, "metaData", 1, -1);
        public static REL_OP_CHANNEL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_metaData", 27, false, 5, "metaData", 1, -1);
        public static REL_OP_CONNECTORTYPE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ConnectorType_metaData", 28, false, 21, "metaData", 1, -1);
        public static REL_OP_NODE_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_metaData", 29, false, 4, "metaData", 1, -1);
        public static REL_OP_ELEMENT_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Element_metaData", 30, false, 0, "metaData", 1, -1);
        public static getInstance(): org.kevoree.meta.MetaValue {
          if (org.kevoree.meta.MetaValue.INSTANCE == null) {
            org.kevoree.meta.MetaValue.INSTANCE = new org.kevoree.meta.MetaValue();
          }
          return org.kevoree.meta.MetaValue.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Value", 1, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 29 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaValue.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaValue.ATT_VALUE;
          temp_all[2] = org.kevoree.meta.MetaValue.REL_OP_FRAGMENTDICTIONARY_METADATA;
          temp_all[3] = org.kevoree.meta.MetaValue.REL_OP_DEPLOYUNIT_METADATA;
          temp_all[4] = org.kevoree.meta.MetaValue.REL_OP_NODETYPE_METADATA;
          temp_all[5] = org.kevoree.meta.MetaValue.REL_OP_INSTANCE_METADATA;
          temp_all[6] = org.kevoree.meta.MetaValue.REL_OP_STORAGEINFO_METADATA;
          temp_all[7] = org.kevoree.meta.MetaValue.REL_METADATA;
          temp_all[8] = org.kevoree.meta.MetaValue.REL_OP_PORTTYPE_METADATA;
          temp_all[9] = org.kevoree.meta.MetaValue.REL_OP_TYPEDEFINITION_METADATA;
          temp_all[10] = org.kevoree.meta.MetaValue.REL_OP_PARAM_METADATA;
          temp_all[11] = org.kevoree.meta.MetaValue.REL_OP_VALUE_METADATA;
          temp_all[12] = org.kevoree.meta.MetaValue.REL_OP_MAXCONSTRAINT_METADATA;
          temp_all[13] = org.kevoree.meta.MetaValue.REL_OP_MINCONSTRAINT_METADATA;
          temp_all[14] = org.kevoree.meta.MetaValue.REL_OP_ABSTRACTCONSTRAINT_METADATA;
          temp_all[15] = org.kevoree.meta.MetaValue.REL_OP_DICTIONARYTYPE_METADATA;
          temp_all[16] = org.kevoree.meta.MetaValue.REL_OP_PORT_METADATA;
          temp_all[17] = org.kevoree.meta.MetaValue.REL_OP_COMPONENT_METADATA;
          temp_all[18] = org.kevoree.meta.MetaValue.REL_OP_STRINGPARAMTYPE_METADATA;
          temp_all[19] = org.kevoree.meta.MetaValue.REL_OP_MODEL_METADATA;
          temp_all[20] = org.kevoree.meta.MetaValue.REL_OP_PORTTYPE_PROTOCOL;
          temp_all[21] = org.kevoree.meta.MetaValue.REL_OP_PARAMTYPE_METADATA;
          temp_all[22] = org.kevoree.meta.MetaValue.REL_OP_DICTIONARY_METADATA;
          temp_all[23] = org.kevoree.meta.MetaValue.REL_OP_LISTPARAMTYPE_METADATA;
          temp_all[24] = org.kevoree.meta.MetaValue.REL_OP_NAMESPACE_METADATA;
          temp_all[25] = org.kevoree.meta.MetaValue.REL_OP_PREFEREDVERSION_METADATA;
          temp_all[26] = org.kevoree.meta.MetaValue.REL_OP_MULTILINECONSTRAINT_METADATA;
          temp_all[27] = org.kevoree.meta.MetaValue.REL_OP_CHANNEL_METADATA;
          temp_all[28] = org.kevoree.meta.MetaValue.REL_OP_CONNECTORTYPE_METADATA;
          temp_all[29] = org.kevoree.meta.MetaValue.REL_OP_NODE_METADATA;
          temp_all[30] = org.kevoree.meta.MetaValue.REL_OP_ELEMENT_METADATA;
          this.init(temp_all);
        }
      }
      export class MetaModel extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaModel = null;
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 0, true, 1, "op_Model_metaData", 2, -1);
        public static REL_NODES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("nodes", 1, true, 4, "op_Model_nodes", 2, -1);
        public static REL_CHANNELS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("channels", 2, true, 5, "op_Model_channels", 2, -1);
        public static REL_STORAGE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("storage", 3, true, 3, "op_Model_storage", 2, 1);
        public static REL_NAMESPACES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("namespaces", 4, true, 6, "op_Model_namespaces", 2, -1);
        public static getInstance(): org.kevoree.meta.MetaModel {
          if (org.kevoree.meta.MetaModel.INSTANCE == null) {
            org.kevoree.meta.MetaModel.INSTANCE = new org.kevoree.meta.MetaModel();
          }
          return org.kevoree.meta.MetaModel.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Model", 2, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(0 + 5 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaModel.REL_METADATA;
          temp_all[1] = org.kevoree.meta.MetaModel.REL_NODES;
          temp_all[2] = org.kevoree.meta.MetaModel.REL_CHANNELS;
          temp_all[3] = org.kevoree.meta.MetaModel.REL_STORAGE;
          temp_all[4] = org.kevoree.meta.MetaModel.REL_NAMESPACES;
          this.init(temp_all);
        }
      }
      export class MetaOutputPort extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaOutputPort = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_Port_metaData", 13, -1);
        public static REL_COMPONENTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("components", 2, true, 10, "outputs", 13, -1);
        public static REL_CHANNELS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("channels", 3, true, 5, "outputs", 13, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 4, true, 16, "op_Port_type", 13, -1);
        public static getInstance(): org.kevoree.meta.MetaOutputPort {
          if (org.kevoree.meta.MetaOutputPort.INSTANCE == null) {
            org.kevoree.meta.MetaOutputPort.INSTANCE = new org.kevoree.meta.MetaOutputPort();
          }
          return org.kevoree.meta.MetaOutputPort.INSTANCE;
        }
        constructor() {
          super("org.kevoree.OutputPort", 13, null, new Int32Array([15]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaOutputPort.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaOutputPort.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaOutputPort.REL_COMPONENTS;
          temp_all[3] = org.kevoree.meta.MetaOutputPort.REL_CHANNELS;
          temp_all[4] = org.kevoree.meta.MetaOutputPort.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaChoiceParamType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaChoiceParamType = null;
        public static ATT_DEFAULT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("default", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("required", 4, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 5, true, 1, "op_ParamType_metaData", 35, -1);
        public static REL_OP_PARAM_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Param_type", 6, false, 26, "type", 35, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 17, "params", 35, -1);
        public static REL_CHOICES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("choices", 8, true, 31, "op_ChoiceParamType_choices", 35, -1);
        public static REL_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("constraints", 9, true, 25, "op_ParamType_constraints", 35, -1);
        public static getInstance(): org.kevoree.meta.MetaChoiceParamType {
          if (org.kevoree.meta.MetaChoiceParamType.INSTANCE == null) {
            org.kevoree.meta.MetaChoiceParamType.INSTANCE = new org.kevoree.meta.MetaChoiceParamType();
          }
          return org.kevoree.meta.MetaChoiceParamType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.ChoiceParamType", 35, null, new Int32Array([24]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(5 + 5 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaChoiceParamType.ATT_DEFAULT;
          temp_all[1] = org.kevoree.meta.MetaChoiceParamType.ATT_FRAGMENT;
          temp_all[2] = org.kevoree.meta.MetaChoiceParamType.ATT_NAME;
          temp_all[3] = org.kevoree.meta.MetaChoiceParamType.ATT_DESCRIPTION;
          temp_all[4] = org.kevoree.meta.MetaChoiceParamType.ATT_REQUIRED;
          temp_all[5] = org.kevoree.meta.MetaChoiceParamType.REL_METADATA;
          temp_all[6] = org.kevoree.meta.MetaChoiceParamType.REL_OP_PARAM_TYPE;
          temp_all[7] = org.kevoree.meta.MetaChoiceParamType.REL_OP_DICTIONARYTYPE_PARAMS;
          temp_all[8] = org.kevoree.meta.MetaChoiceParamType.REL_CHOICES;
          temp_all[9] = org.kevoree.meta.MetaChoiceParamType.REL_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaConnectorType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaConnectorType = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("version", 2, 0, false, -4, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_ConnectorType_metaData", 21, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 4, true, 17, "op_ConnectorType_dictionary", 21, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_typeDefinition", 5, false, 4, "typeDefinition", 21, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_typeDefinition", 6, false, 7, "typeDefinition", 21, -1);
        public static REL_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("deployUnits", 7, true, 18, "op_ConnectorType_deployUnits", 21, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 8, false, 6, "typeDefinitions", 21, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_typeDefinition", 9, false, 10, "typeDefinition", 21, -1);
        public static REL_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("preferedVersions", 10, true, 19, "op_ConnectorType_preferedVersions", 21, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_typeDefinition", 11, false, 5, "typeDefinition", 21, -1);
        public static getInstance(): org.kevoree.meta.MetaConnectorType {
          if (org.kevoree.meta.MetaConnectorType.INSTANCE == null) {
            org.kevoree.meta.MetaConnectorType.INSTANCE = new org.kevoree.meta.MetaConnectorType();
          }
          return org.kevoree.meta.MetaConnectorType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.ConnectorType", 21, null, new Int32Array([8]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(3 + 9 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaConnectorType.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaConnectorType.ATT_DESCRIPTION;
          temp_all[2] = org.kevoree.meta.MetaConnectorType.ATT_VERSION;
          temp_all[3] = org.kevoree.meta.MetaConnectorType.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaConnectorType.REL_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaConnectorType.REL_OP_NODE_TYPEDEFINITION;
          temp_all[6] = org.kevoree.meta.MetaConnectorType.REL_OP_INSTANCE_TYPEDEFINITION;
          temp_all[7] = org.kevoree.meta.MetaConnectorType.REL_DEPLOYUNITS;
          temp_all[8] = org.kevoree.meta.MetaConnectorType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
          temp_all[9] = org.kevoree.meta.MetaConnectorType.REL_OP_COMPONENT_TYPEDEFINITION;
          temp_all[10] = org.kevoree.meta.MetaConnectorType.REL_PREFEREDVERSIONS;
          temp_all[11] = org.kevoree.meta.MetaConnectorType.REL_OP_CHANNEL_TYPEDEFINITION;
          this.init(temp_all);
        }
      }
      export class MetaNode extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaNode = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 2, true, 1, "op_Node_metaData", 4, -1);
        public static REL_OP_NODE_HOST: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_host", 3, false, 4, "host", 4, -1);
        public static REL_OP_MODEL_NODES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Model_nodes", 4, false, 2, "nodes", 4, -1);
        public static REL_COMPONENTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("components", 5, true, 10, "host", 4, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 6, true, 9, "op_Node_dictionary", 4, 1);
        public static REL_CONNECTOR: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("connector", 7, true, 11, "node", 4, 1);
        public static REL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("typeDefinition", 8, true, 8, "op_Node_typeDefinition", 4, 1);
        public static REL_HOST: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("host", 9, true, 4, "op_Node_host", 4, 1);
        public static getInstance(): org.kevoree.meta.MetaNode {
          if (org.kevoree.meta.MetaNode.INSTANCE == null) {
            org.kevoree.meta.MetaNode.INSTANCE = new org.kevoree.meta.MetaNode();
          }
          return org.kevoree.meta.MetaNode.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Node", 4, null, new Int32Array([7]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 8 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaNode.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaNode.ATT_STARTED;
          temp_all[2] = org.kevoree.meta.MetaNode.REL_METADATA;
          temp_all[3] = org.kevoree.meta.MetaNode.REL_OP_NODE_HOST;
          temp_all[4] = org.kevoree.meta.MetaNode.REL_OP_MODEL_NODES;
          temp_all[5] = org.kevoree.meta.MetaNode.REL_COMPONENTS;
          temp_all[6] = org.kevoree.meta.MetaNode.REL_DICTIONARY;
          temp_all[7] = org.kevoree.meta.MetaNode.REL_CONNECTOR;
          temp_all[8] = org.kevoree.meta.MetaNode.REL_TYPEDEFINITION;
          temp_all[9] = org.kevoree.meta.MetaNode.REL_HOST;
          this.init(temp_all);
        }
      }
      export class MetaInstance extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaInstance = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 2, true, 1, "op_Instance_metaData", 7, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 3, true, 9, "op_Instance_dictionary", 7, 1);
        public static REL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("typeDefinition", 4, true, 8, "op_Instance_typeDefinition", 7, 1);
        public static getInstance(): org.kevoree.meta.MetaInstance {
          if (org.kevoree.meta.MetaInstance.INSTANCE == null) {
            org.kevoree.meta.MetaInstance.INSTANCE = new org.kevoree.meta.MetaInstance();
          }
          return org.kevoree.meta.MetaInstance.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Instance", 7, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 3 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaInstance.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaInstance.ATT_STARTED;
          temp_all[2] = org.kevoree.meta.MetaInstance.REL_METADATA;
          temp_all[3] = org.kevoree.meta.MetaInstance.REL_DICTIONARY;
          temp_all[4] = org.kevoree.meta.MetaInstance.REL_TYPEDEFINITION;
          this.init(temp_all);
        }
      }
      export class MetaAbstractConstraint extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaAbstractConstraint = null;
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 0, true, 1, "op_AbstractConstraint_metaData", 25, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ListParamType_constraints", 1, false, 36, "constraints", 25, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_StringParamType_constraints", 2, false, 32, "constraints", 25, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ParamType_constraints", 3, false, 24, "constraints", 25, -1);
        public static getInstance(): org.kevoree.meta.MetaAbstractConstraint {
          if (org.kevoree.meta.MetaAbstractConstraint.INSTANCE == null) {
            org.kevoree.meta.MetaAbstractConstraint.INSTANCE = new org.kevoree.meta.MetaAbstractConstraint();
          }
          return org.kevoree.meta.MetaAbstractConstraint.INSTANCE;
        }
        constructor() {
          super("org.kevoree.AbstractConstraint", 25, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(0 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaAbstractConstraint.REL_METADATA;
          temp_all[1] = org.kevoree.meta.MetaAbstractConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
          temp_all[2] = org.kevoree.meta.MetaAbstractConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
          temp_all[3] = org.kevoree.meta.MetaAbstractConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaDictionaryType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaDictionaryType = null;
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 0, true, 1, "op_DictionaryType_metaData", 17, -1);
        public static REL_OP_TYPEDEFINITION_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_TypeDefinition_dictionary", 1, false, 8, "dictionary", 17, -1);
        public static REL_OP_CONNECTORTYPE_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ConnectorType_dictionary", 2, false, 21, "dictionary", 17, -1);
        public static REL_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("params", 3, true, 24, "op_DictionaryType_params", 17, -1);
        public static REL_OP_NODETYPE_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_NodeType_dictionary", 4, false, 20, "dictionary", 17, -1);
        public static getInstance(): org.kevoree.meta.MetaDictionaryType {
          if (org.kevoree.meta.MetaDictionaryType.INSTANCE == null) {
            org.kevoree.meta.MetaDictionaryType.INSTANCE = new org.kevoree.meta.MetaDictionaryType();
          }
          return org.kevoree.meta.MetaDictionaryType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.DictionaryType", 17, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(0 + 5 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaDictionaryType.REL_METADATA;
          temp_all[1] = org.kevoree.meta.MetaDictionaryType.REL_OP_TYPEDEFINITION_DICTIONARY;
          temp_all[2] = org.kevoree.meta.MetaDictionaryType.REL_OP_CONNECTORTYPE_DICTIONARY;
          temp_all[3] = org.kevoree.meta.MetaDictionaryType.REL_PARAMS;
          temp_all[4] = org.kevoree.meta.MetaDictionaryType.REL_OP_NODETYPE_DICTIONARY;
          this.init(temp_all);
        }
      }
      export class MetaMinConstraint extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaMinConstraint = null;
        public static ATT_EXCLUSIVE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("exclusive", 0, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 1, 0, false, -4, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 2, true, 1, "op_MinConstraint_metaData", 37, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ListParamType_constraints", 3, false, 36, "constraints", 37, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_StringParamType_constraints", 4, false, 32, "constraints", 37, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ParamType_constraints", 5, false, 24, "constraints", 37, -1);
        public static getInstance(): org.kevoree.meta.MetaMinConstraint {
          if (org.kevoree.meta.MetaMinConstraint.INSTANCE == null) {
            org.kevoree.meta.MetaMinConstraint.INSTANCE = new org.kevoree.meta.MetaMinConstraint();
          }
          return org.kevoree.meta.MetaMinConstraint.INSTANCE;
        }
        constructor() {
          super("org.kevoree.MinConstraint", 37, null, new Int32Array([25]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaMinConstraint.ATT_EXCLUSIVE;
          temp_all[1] = org.kevoree.meta.MetaMinConstraint.ATT_VALUE;
          temp_all[2] = org.kevoree.meta.MetaMinConstraint.REL_METADATA;
          temp_all[3] = org.kevoree.meta.MetaMinConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
          temp_all[4] = org.kevoree.meta.MetaMinConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
          temp_all[5] = org.kevoree.meta.MetaMinConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaComponent extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaComponent = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OUTPUTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("outputs", 2, true, 13, "components", 10, -1);
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_Component_metaData", 10, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 4, true, 9, "op_Component_dictionary", 10, 1);
        public static REL_INPUTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("inputs", 5, true, 12, "components", 10, -1);
        public static REL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("typeDefinition", 6, true, 8, "op_Component_typeDefinition", 10, 1);
        public static REL_HOST: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("host", 7, true, 4, "components", 10, 1);
        public static getInstance(): org.kevoree.meta.MetaComponent {
          if (org.kevoree.meta.MetaComponent.INSTANCE == null) {
            org.kevoree.meta.MetaComponent.INSTANCE = new org.kevoree.meta.MetaComponent();
          }
          return org.kevoree.meta.MetaComponent.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Component", 10, null, new Int32Array([7]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 6 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaComponent.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaComponent.ATT_STARTED;
          temp_all[2] = org.kevoree.meta.MetaComponent.REL_OUTPUTS;
          temp_all[3] = org.kevoree.meta.MetaComponent.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaComponent.REL_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaComponent.REL_INPUTS;
          temp_all[6] = org.kevoree.meta.MetaComponent.REL_TYPEDEFINITION;
          temp_all[7] = org.kevoree.meta.MetaComponent.REL_HOST;
          this.init(temp_all);
        }
      }
      export class MetaComponentType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaComponentType = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REMOTE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("remote", 2, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("version", 3, 0, false, -4, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_INPUTTYPES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("inputTypes", 4, true, 16, "op_ComponentType_inputTypes", 23, -1);
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 5, true, 1, "op_TypeDefinition_metaData", 23, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 6, true, 17, "op_TypeDefinition_dictionary", 23, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_typeDefinition", 7, false, 4, "typeDefinition", 23, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_typeDefinition", 8, false, 7, "typeDefinition", 23, -1);
        public static REL_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("deployUnits", 9, true, 18, "op_TypeDefinition_deployUnits", 23, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 10, false, 6, "typeDefinitions", 23, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_typeDefinition", 11, false, 10, "typeDefinition", 23, -1);
        public static REL_OUTPUTTYPES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("outputTypes", 12, true, 16, "op_ComponentType_outputTypes", 23, -1);
        public static REL_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("preferedVersions", 13, true, 19, "op_TypeDefinition_preferedVersions", 23, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_typeDefinition", 14, false, 5, "typeDefinition", 23, -1);
        public static getInstance(): org.kevoree.meta.MetaComponentType {
          if (org.kevoree.meta.MetaComponentType.INSTANCE == null) {
            org.kevoree.meta.MetaComponentType.INSTANCE = new org.kevoree.meta.MetaComponentType();
          }
          return org.kevoree.meta.MetaComponentType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.ComponentType", 23, null, new Int32Array([8]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(4 + 11 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaComponentType.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaComponentType.ATT_DESCRIPTION;
          temp_all[2] = org.kevoree.meta.MetaComponentType.ATT_REMOTE;
          temp_all[3] = org.kevoree.meta.MetaComponentType.ATT_VERSION;
          temp_all[4] = org.kevoree.meta.MetaComponentType.REL_INPUTTYPES;
          temp_all[5] = org.kevoree.meta.MetaComponentType.REL_METADATA;
          temp_all[6] = org.kevoree.meta.MetaComponentType.REL_DICTIONARY;
          temp_all[7] = org.kevoree.meta.MetaComponentType.REL_OP_NODE_TYPEDEFINITION;
          temp_all[8] = org.kevoree.meta.MetaComponentType.REL_OP_INSTANCE_TYPEDEFINITION;
          temp_all[9] = org.kevoree.meta.MetaComponentType.REL_DEPLOYUNITS;
          temp_all[10] = org.kevoree.meta.MetaComponentType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
          temp_all[11] = org.kevoree.meta.MetaComponentType.REL_OP_COMPONENT_TYPEDEFINITION;
          temp_all[12] = org.kevoree.meta.MetaComponentType.REL_OUTPUTTYPES;
          temp_all[13] = org.kevoree.meta.MetaComponentType.REL_PREFEREDVERSIONS;
          temp_all[14] = org.kevoree.meta.MetaComponentType.REL_OP_CHANNEL_TYPEDEFINITION;
          this.init(temp_all);
        }
      }
      export class MetaStorageInfo extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaStorageInfo = null;
        public static ATT_URI: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("uri", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_StorageInfo_metaData", 3, -1);
        public static REL_OP_MODEL_STORAGE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Model_storage", 2, false, 2, "storage", 3, -1);
        public static getInstance(): org.kevoree.meta.MetaStorageInfo {
          if (org.kevoree.meta.MetaStorageInfo.INSTANCE == null) {
            org.kevoree.meta.MetaStorageInfo.INSTANCE = new org.kevoree.meta.MetaStorageInfo();
          }
          return org.kevoree.meta.MetaStorageInfo.INSTANCE;
        }
        constructor() {
          super("org.kevoree.StorageInfo", 3, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 2 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaStorageInfo.ATT_URI;
          temp_all[1] = org.kevoree.meta.MetaStorageInfo.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaStorageInfo.REL_OP_MODEL_STORAGE;
          this.init(temp_all);
        }
      }
      export class MetaChannel extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaChannel = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OUTPUTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("outputs", 2, true, 13, "channels", 5, -1);
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_Channel_metaData", 5, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 4, true, 9, "op_Channel_dictionary", 5, 1);
        public static REL_INPUTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("inputs", 5, true, 12, "channels", 5, -1);
        public static REL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("typeDefinition", 6, true, 8, "op_Channel_typeDefinition", 5, 1);
        public static REL_FRAGMENTDICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("fragmentDictionary", 7, true, 14, "op_Channel_fragmentDictionary", 5, -1);
        public static REL_OP_MODEL_CHANNELS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Model_channels", 8, false, 2, "channels", 5, -1);
        public static getInstance(): org.kevoree.meta.MetaChannel {
          if (org.kevoree.meta.MetaChannel.INSTANCE == null) {
            org.kevoree.meta.MetaChannel.INSTANCE = new org.kevoree.meta.MetaChannel();
          }
          return org.kevoree.meta.MetaChannel.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Channel", 5, null, new Int32Array([7]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 7 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaChannel.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaChannel.ATT_STARTED;
          temp_all[2] = org.kevoree.meta.MetaChannel.REL_OUTPUTS;
          temp_all[3] = org.kevoree.meta.MetaChannel.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaChannel.REL_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaChannel.REL_INPUTS;
          temp_all[6] = org.kevoree.meta.MetaChannel.REL_TYPEDEFINITION;
          temp_all[7] = org.kevoree.meta.MetaChannel.REL_FRAGMENTDICTIONARY;
          temp_all[8] = org.kevoree.meta.MetaChannel.REL_OP_MODEL_CHANNELS;
          this.init(temp_all);
        }
      }
      export class MetaMaxConstraint extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaMaxConstraint = null;
        public static ATT_EXCLUSIVE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("exclusive", 0, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 1, 0, false, -4, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 2, true, 1, "op_MaxConstraint_metaData", 38, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ListParamType_constraints", 3, false, 36, "constraints", 38, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_StringParamType_constraints", 4, false, 32, "constraints", 38, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ParamType_constraints", 5, false, 24, "constraints", 38, -1);
        public static getInstance(): org.kevoree.meta.MetaMaxConstraint {
          if (org.kevoree.meta.MetaMaxConstraint.INSTANCE == null) {
            org.kevoree.meta.MetaMaxConstraint.INSTANCE = new org.kevoree.meta.MetaMaxConstraint();
          }
          return org.kevoree.meta.MetaMaxConstraint.INSTANCE;
        }
        constructor() {
          super("org.kevoree.MaxConstraint", 38, null, new Int32Array([25]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaMaxConstraint.ATT_EXCLUSIVE;
          temp_all[1] = org.kevoree.meta.MetaMaxConstraint.ATT_VALUE;
          temp_all[2] = org.kevoree.meta.MetaMaxConstraint.REL_METADATA;
          temp_all[3] = org.kevoree.meta.MetaMaxConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
          temp_all[4] = org.kevoree.meta.MetaMaxConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
          temp_all[5] = org.kevoree.meta.MetaMaxConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaElement extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaElement = null;
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 0, true, 1, "op_Element_metaData", 0, -1);
        public static getInstance(): org.kevoree.meta.MetaElement {
          if (org.kevoree.meta.MetaElement.INSTANCE == null) {
            org.kevoree.meta.MetaElement.INSTANCE = new org.kevoree.meta.MetaElement();
          }
          return org.kevoree.meta.MetaElement.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Element", 0, null, new Int32Array([]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(0 + 1 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaElement.REL_METADATA;
          this.init(temp_all);
        }
      }
      export class MetaNumberParamType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaNumberParamType = null;
        public static ATT_DEFAULT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("default", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_TYPE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("type", 4, 0, false, 0, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("required", 5, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 6, true, 1, "op_ParamType_metaData", 33, -1);
        public static REL_OP_PARAM_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Param_type", 7, false, 26, "type", 33, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DictionaryType_params", 8, false, 17, "params", 33, -1);
        public static REL_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("constraints", 9, true, 25, "op_ParamType_constraints", 33, -1);
        public static getInstance(): org.kevoree.meta.MetaNumberParamType {
          if (org.kevoree.meta.MetaNumberParamType.INSTANCE == null) {
            org.kevoree.meta.MetaNumberParamType.INSTANCE = new org.kevoree.meta.MetaNumberParamType();
          }
          return org.kevoree.meta.MetaNumberParamType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.NumberParamType", 33, null, new Int32Array([24]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(6 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaNumberParamType.ATT_DEFAULT;
          temp_all[1] = org.kevoree.meta.MetaNumberParamType.ATT_FRAGMENT;
          temp_all[2] = org.kevoree.meta.MetaNumberParamType.ATT_NAME;
          temp_all[3] = org.kevoree.meta.MetaNumberParamType.ATT_DESCRIPTION;
          temp_all[4] = org.kevoree.meta.MetaNumberParamType.ATT_TYPE;
          temp_all[5] = org.kevoree.meta.MetaNumberParamType.ATT_REQUIRED;
          temp_all[6] = org.kevoree.meta.MetaNumberParamType.REL_METADATA;
          temp_all[7] = org.kevoree.meta.MetaNumberParamType.REL_OP_PARAM_TYPE;
          temp_all[8] = org.kevoree.meta.MetaNumberParamType.REL_OP_DICTIONARYTYPE_PARAMS;
          temp_all[9] = org.kevoree.meta.MetaNumberParamType.REL_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaDeployUnit extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaDeployUnit = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("version", 1, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_PLATFORM: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("platform", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_DeployUnit_metaData", 18, -1);
        public static REL_OP_CONNECTORTYPE_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ConnectorType_deployUnits", 4, false, 21, "deployUnits", 18, -1);
        public static REL_OP_TYPEDEFINITION_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_TypeDefinition_deployUnits", 5, false, 8, "deployUnits", 18, -1);
        public static REL_OP_NODETYPE_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_NodeType_deployUnits", 6, false, 20, "deployUnits", 18, -1);
        public static getInstance(): org.kevoree.meta.MetaDeployUnit {
          if (org.kevoree.meta.MetaDeployUnit.INSTANCE == null) {
            org.kevoree.meta.MetaDeployUnit.INSTANCE = new org.kevoree.meta.MetaDeployUnit();
          }
          return org.kevoree.meta.MetaDeployUnit.INSTANCE;
        }
        constructor() {
          super("org.kevoree.DeployUnit", 18, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(3 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaDeployUnit.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaDeployUnit.ATT_VERSION;
          temp_all[2] = org.kevoree.meta.MetaDeployUnit.ATT_PLATFORM;
          temp_all[3] = org.kevoree.meta.MetaDeployUnit.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaDeployUnit.REL_OP_CONNECTORTYPE_DEPLOYUNITS;
          temp_all[5] = org.kevoree.meta.MetaDeployUnit.REL_OP_TYPEDEFINITION_DEPLOYUNITS;
          temp_all[6] = org.kevoree.meta.MetaDeployUnit.REL_OP_NODETYPE_DEPLOYUNITS;
          this.init(temp_all);
        }
      }
      export class MetaMultilineConstraint extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaMultilineConstraint = null;
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 0, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_MultilineConstraint_metaData", 39, -1);
        public static REL_OP_LISTPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ListParamType_constraints", 2, false, 36, "constraints", 39, -1);
        public static REL_OP_STRINGPARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_StringParamType_constraints", 3, false, 32, "constraints", 39, -1);
        public static REL_OP_PARAMTYPE_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ParamType_constraints", 4, false, 24, "constraints", 39, -1);
        public static getInstance(): org.kevoree.meta.MetaMultilineConstraint {
          if (org.kevoree.meta.MetaMultilineConstraint.INSTANCE == null) {
            org.kevoree.meta.MetaMultilineConstraint.INSTANCE = new org.kevoree.meta.MetaMultilineConstraint();
          }
          return org.kevoree.meta.MetaMultilineConstraint.INSTANCE;
        }
        constructor() {
          super("org.kevoree.MultilineConstraint", 39, null, new Int32Array([25]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaMultilineConstraint.ATT_VALUE;
          temp_all[1] = org.kevoree.meta.MetaMultilineConstraint.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaMultilineConstraint.REL_OP_LISTPARAMTYPE_CONSTRAINTS;
          temp_all[3] = org.kevoree.meta.MetaMultilineConstraint.REL_OP_STRINGPARAMTYPE_CONSTRAINTS;
          temp_all[4] = org.kevoree.meta.MetaMultilineConstraint.REL_OP_PARAMTYPE_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaBooleanParamType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaBooleanParamType = null;
        public static ATT_DEFAULT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("default", 0, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("required", 4, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 5, true, 1, "op_ParamType_metaData", 34, -1);
        public static REL_OP_PARAM_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Param_type", 6, false, 26, "type", 34, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 17, "params", 34, -1);
        public static REL_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("constraints", 8, true, 25, "op_ParamType_constraints", 34, -1);
        public static getInstance(): org.kevoree.meta.MetaBooleanParamType {
          if (org.kevoree.meta.MetaBooleanParamType.INSTANCE == null) {
            org.kevoree.meta.MetaBooleanParamType.INSTANCE = new org.kevoree.meta.MetaBooleanParamType();
          }
          return org.kevoree.meta.MetaBooleanParamType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.BooleanParamType", 34, null, new Int32Array([24]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(5 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaBooleanParamType.ATT_DEFAULT;
          temp_all[1] = org.kevoree.meta.MetaBooleanParamType.ATT_FRAGMENT;
          temp_all[2] = org.kevoree.meta.MetaBooleanParamType.ATT_NAME;
          temp_all[3] = org.kevoree.meta.MetaBooleanParamType.ATT_DESCRIPTION;
          temp_all[4] = org.kevoree.meta.MetaBooleanParamType.ATT_REQUIRED;
          temp_all[5] = org.kevoree.meta.MetaBooleanParamType.REL_METADATA;
          temp_all[6] = org.kevoree.meta.MetaBooleanParamType.REL_OP_PARAM_TYPE;
          temp_all[7] = org.kevoree.meta.MetaBooleanParamType.REL_OP_DICTIONARYTYPE_PARAMS;
          temp_all[8] = org.kevoree.meta.MetaBooleanParamType.REL_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaPort extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaPort = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_Port_metaData", 15, -1);
        public static REL_COMPONENTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("components", 2, true, 10, "outputs", 15, 1);
        public static REL_CHANNELS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("channels", 3, true, 5, "outputs", 15, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 4, true, 16, "op_Port_type", 15, -1);
        public static getInstance(): org.kevoree.meta.MetaPort {
          if (org.kevoree.meta.MetaPort.INSTANCE == null) {
            org.kevoree.meta.MetaPort.INSTANCE = new org.kevoree.meta.MetaPort();
          }
          return org.kevoree.meta.MetaPort.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Port", 15, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaPort.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaPort.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaPort.REL_COMPONENTS;
          temp_all[3] = org.kevoree.meta.MetaPort.REL_CHANNELS;
          temp_all[4] = org.kevoree.meta.MetaPort.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaParam extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaParam = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_Param_metaData", 26, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Dictionary_params", 2, false, 9, "params", 26, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_FragmentDictionary_params", 3, false, 14, "params", 26, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 4, true, 24, "op_Param_type", 26, -1);
        public static getInstance(): org.kevoree.meta.MetaParam {
          if (org.kevoree.meta.MetaParam.INSTANCE == null) {
            org.kevoree.meta.MetaParam.INSTANCE = new org.kevoree.meta.MetaParam();
          }
          return org.kevoree.meta.MetaParam.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Param", 26, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaParam.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaParam.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaParam.REL_OP_DICTIONARY_PARAMS;
          temp_all[3] = org.kevoree.meta.MetaParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
          temp_all[4] = org.kevoree.meta.MetaParam.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaNamespace extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaNamespace = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_Namespace_metaData", 6, -1);
        public static REL_TYPEDEFINITIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("typeDefinitions", 2, true, 8, "op_Namespace_typeDefinitions", 6, -1);
        public static REL_OP_MODEL_NAMESPACES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Model_namespaces", 3, false, 2, "namespaces", 6, -1);
        public static getInstance(): org.kevoree.meta.MetaNamespace {
          if (org.kevoree.meta.MetaNamespace.INSTANCE == null) {
            org.kevoree.meta.MetaNamespace.INSTANCE = new org.kevoree.meta.MetaNamespace();
          }
          return org.kevoree.meta.MetaNamespace.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Namespace", 6, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 3 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaNamespace.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaNamespace.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaNamespace.REL_TYPEDEFINITIONS;
          temp_all[3] = org.kevoree.meta.MetaNamespace.REL_OP_MODEL_NAMESPACES;
          this.init(temp_all);
        }
      }
      export class MetaInputPort extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaInputPort = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_Port_metaData", 12, -1);
        public static REL_COMPONENTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("components", 2, true, 10, "inputs", 12, -1);
        public static REL_CHANNELS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("channels", 3, true, 5, "inputs", 12, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 4, true, 16, "op_Port_type", 12, -1);
        public static getInstance(): org.kevoree.meta.MetaInputPort {
          if (org.kevoree.meta.MetaInputPort.INSTANCE == null) {
            org.kevoree.meta.MetaInputPort.INSTANCE = new org.kevoree.meta.MetaInputPort();
          }
          return org.kevoree.meta.MetaInputPort.INSTANCE;
        }
        constructor() {
          super("org.kevoree.InputPort", 12, null, new Int32Array([15]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaInputPort.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaInputPort.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaInputPort.REL_COMPONENTS;
          temp_all[3] = org.kevoree.meta.MetaInputPort.REL_CHANNELS;
          temp_all[4] = org.kevoree.meta.MetaInputPort.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaNumberParam extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaNumberParam = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 2, true, 1, "op_Param_metaData", 28, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Dictionary_params", 3, false, 9, "params", 28, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_FragmentDictionary_params", 4, false, 14, "params", 28, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 5, true, 24, "op_Param_type", 28, -1);
        public static getInstance(): org.kevoree.meta.MetaNumberParam {
          if (org.kevoree.meta.MetaNumberParam.INSTANCE == null) {
            org.kevoree.meta.MetaNumberParam.INSTANCE = new org.kevoree.meta.MetaNumberParam();
          }
          return org.kevoree.meta.MetaNumberParam.INSTANCE;
        }
        constructor() {
          super("org.kevoree.NumberParam", 28, null, new Int32Array([26]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaNumberParam.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaNumberParam.ATT_VALUE;
          temp_all[2] = org.kevoree.meta.MetaNumberParam.REL_METADATA;
          temp_all[3] = org.kevoree.meta.MetaNumberParam.REL_OP_DICTIONARY_PARAMS;
          temp_all[4] = org.kevoree.meta.MetaNumberParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
          temp_all[5] = org.kevoree.meta.MetaNumberParam.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaItem extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaItem = null;
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_OP_CHOICEPARAMTYPE_CHOICES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ChoiceParamType_choices", 1, false, 35, "choices", 31, -1);
        public static REL_OP_LISTPARAMTYPE_DEFAULT: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ListParamType_default", 2, false, 36, "default", 31, -1);
        public static REL_OP_LISTPARAM_VALUES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ListParam_values", 3, false, 30, "values", 31, -1);
        public static getInstance(): org.kevoree.meta.MetaItem {
          if (org.kevoree.meta.MetaItem.INSTANCE == null) {
            org.kevoree.meta.MetaItem.INSTANCE = new org.kevoree.meta.MetaItem();
          }
          return org.kevoree.meta.MetaItem.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Item", 31, null, new Int32Array([]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 3 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaItem.ATT_VALUE;
          temp_all[1] = org.kevoree.meta.MetaItem.REL_OP_CHOICEPARAMTYPE_CHOICES;
          temp_all[2] = org.kevoree.meta.MetaItem.REL_OP_LISTPARAMTYPE_DEFAULT;
          temp_all[3] = org.kevoree.meta.MetaItem.REL_OP_LISTPARAM_VALUES;
          this.init(temp_all);
        }
      }
      export class MetaParamType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaParamType = null;
        public static ATT_FRAGMENT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("fragment", 0, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 1, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("required", 3, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 4, true, 1, "op_ParamType_metaData", 24, -1);
        public static REL_OP_PARAM_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Param_type", 5, false, 26, "type", 24, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DictionaryType_params", 6, false, 17, "params", 24, -1);
        public static REL_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("constraints", 7, true, 25, "op_ParamType_constraints", 24, -1);
        public static getInstance(): org.kevoree.meta.MetaParamType {
          if (org.kevoree.meta.MetaParamType.INSTANCE == null) {
            org.kevoree.meta.MetaParamType.INSTANCE = new org.kevoree.meta.MetaParamType();
          }
          return org.kevoree.meta.MetaParamType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.ParamType", 24, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(4 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaParamType.ATT_FRAGMENT;
          temp_all[1] = org.kevoree.meta.MetaParamType.ATT_NAME;
          temp_all[2] = org.kevoree.meta.MetaParamType.ATT_DESCRIPTION;
          temp_all[3] = org.kevoree.meta.MetaParamType.ATT_REQUIRED;
          temp_all[4] = org.kevoree.meta.MetaParamType.REL_METADATA;
          temp_all[5] = org.kevoree.meta.MetaParamType.REL_OP_PARAM_TYPE;
          temp_all[6] = org.kevoree.meta.MetaParamType.REL_OP_DICTIONARYTYPE_PARAMS;
          temp_all[7] = org.kevoree.meta.MetaParamType.REL_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaBooleanParam extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaBooleanParam = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 2, true, 1, "op_Param_metaData", 29, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Dictionary_params", 3, false, 9, "params", 29, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_FragmentDictionary_params", 4, false, 14, "params", 29, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 5, true, 24, "op_Param_type", 29, -1);
        public static getInstance(): org.kevoree.meta.MetaBooleanParam {
          if (org.kevoree.meta.MetaBooleanParam.INSTANCE == null) {
            org.kevoree.meta.MetaBooleanParam.INSTANCE = new org.kevoree.meta.MetaBooleanParam();
          }
          return org.kevoree.meta.MetaBooleanParam.INSTANCE;
        }
        constructor() {
          super("org.kevoree.BooleanParam", 29, null, new Int32Array([26]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaBooleanParam.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaBooleanParam.ATT_VALUE;
          temp_all[2] = org.kevoree.meta.MetaBooleanParam.REL_METADATA;
          temp_all[3] = org.kevoree.meta.MetaBooleanParam.REL_OP_DICTIONARY_PARAMS;
          temp_all[4] = org.kevoree.meta.MetaBooleanParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
          temp_all[5] = org.kevoree.meta.MetaBooleanParam.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaPortType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaPortType = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_PortType_metaData", 16, -1);
        public static REL_PROTOCOL: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("protocol", 2, true, 1, "op_PortType_protocol", 16, -1);
        public static REL_OP_COMPONENTTYPE_OUTPUTTYPES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ComponentType_outputTypes", 3, false, 23, "outputTypes", 16, -1);
        public static REL_OP_PORT_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Port_type", 4, false, 15, "type", 16, -1);
        public static REL_OP_COMPONENTTYPE_INPUTTYPES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ComponentType_inputTypes", 5, false, 23, "inputTypes", 16, -1);
        public static getInstance(): org.kevoree.meta.MetaPortType {
          if (org.kevoree.meta.MetaPortType.INSTANCE == null) {
            org.kevoree.meta.MetaPortType.INSTANCE = new org.kevoree.meta.MetaPortType();
          }
          return org.kevoree.meta.MetaPortType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.PortType", 16, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 5 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaPortType.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaPortType.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaPortType.REL_PROTOCOL;
          temp_all[3] = org.kevoree.meta.MetaPortType.REL_OP_COMPONENTTYPE_OUTPUTTYPES;
          temp_all[4] = org.kevoree.meta.MetaPortType.REL_OP_PORT_TYPE;
          temp_all[5] = org.kevoree.meta.MetaPortType.REL_OP_COMPONENTTYPE_INPUTTYPES;
          this.init(temp_all);
        }
      }
      export class MetaChannelType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaChannelType = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REMOTE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("remote", 2, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENTABLE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("fragmentable", 3, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("version", 4, 0, false, -4, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 5, true, 1, "op_TypeDefinition_metaData", 22, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 6, true, 17, "op_TypeDefinition_dictionary", 22, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_typeDefinition", 7, false, 4, "typeDefinition", 22, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_typeDefinition", 8, false, 7, "typeDefinition", 22, -1);
        public static REL_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("deployUnits", 9, true, 18, "op_TypeDefinition_deployUnits", 22, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 10, false, 6, "typeDefinitions", 22, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_typeDefinition", 11, false, 10, "typeDefinition", 22, -1);
        public static REL_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("preferedVersions", 12, true, 19, "op_TypeDefinition_preferedVersions", 22, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_typeDefinition", 13, false, 5, "typeDefinition", 22, -1);
        public static getInstance(): org.kevoree.meta.MetaChannelType {
          if (org.kevoree.meta.MetaChannelType.INSTANCE == null) {
            org.kevoree.meta.MetaChannelType.INSTANCE = new org.kevoree.meta.MetaChannelType();
          }
          return org.kevoree.meta.MetaChannelType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.ChannelType", 22, null, new Int32Array([8]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(5 + 9 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaChannelType.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaChannelType.ATT_DESCRIPTION;
          temp_all[2] = org.kevoree.meta.MetaChannelType.ATT_REMOTE;
          temp_all[3] = org.kevoree.meta.MetaChannelType.ATT_FRAGMENTABLE;
          temp_all[4] = org.kevoree.meta.MetaChannelType.ATT_VERSION;
          temp_all[5] = org.kevoree.meta.MetaChannelType.REL_METADATA;
          temp_all[6] = org.kevoree.meta.MetaChannelType.REL_DICTIONARY;
          temp_all[7] = org.kevoree.meta.MetaChannelType.REL_OP_NODE_TYPEDEFINITION;
          temp_all[8] = org.kevoree.meta.MetaChannelType.REL_OP_INSTANCE_TYPEDEFINITION;
          temp_all[9] = org.kevoree.meta.MetaChannelType.REL_DEPLOYUNITS;
          temp_all[10] = org.kevoree.meta.MetaChannelType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
          temp_all[11] = org.kevoree.meta.MetaChannelType.REL_OP_COMPONENT_TYPEDEFINITION;
          temp_all[12] = org.kevoree.meta.MetaChannelType.REL_PREFEREDVERSIONS;
          temp_all[13] = org.kevoree.meta.MetaChannelType.REL_OP_CHANNEL_TYPEDEFINITION;
          this.init(temp_all);
        }
      }
      export class MetaPreferedVersion extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaPreferedVersion = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("version", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_PLATFORM: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("platform", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_PreferedVersion_metaData", 19, -1);
        public static REL_OP_NODETYPE_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_NodeType_preferedVersions", 4, false, 20, "preferedVersions", 19, -1);
        public static REL_OP_TYPEDEFINITION_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_TypeDefinition_preferedVersions", 5, false, 8, "preferedVersions", 19, -1);
        public static REL_OP_CONNECTORTYPE_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_ConnectorType_preferedVersions", 6, false, 21, "preferedVersions", 19, -1);
        public static getInstance(): org.kevoree.meta.MetaPreferedVersion {
          if (org.kevoree.meta.MetaPreferedVersion.INSTANCE == null) {
            org.kevoree.meta.MetaPreferedVersion.INSTANCE = new org.kevoree.meta.MetaPreferedVersion();
          }
          return org.kevoree.meta.MetaPreferedVersion.INSTANCE;
        }
        constructor() {
          super("org.kevoree.PreferedVersion", 19, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(3 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaPreferedVersion.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaPreferedVersion.ATT_VERSION;
          temp_all[2] = org.kevoree.meta.MetaPreferedVersion.ATT_PLATFORM;
          temp_all[3] = org.kevoree.meta.MetaPreferedVersion.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaPreferedVersion.REL_OP_NODETYPE_PREFEREDVERSIONS;
          temp_all[5] = org.kevoree.meta.MetaPreferedVersion.REL_OP_TYPEDEFINITION_PREFEREDVERSIONS;
          temp_all[6] = org.kevoree.meta.MetaPreferedVersion.REL_OP_CONNECTORTYPE_PREFEREDVERSIONS;
          this.init(temp_all);
        }
      }
      export class MetaStringParamType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaStringParamType = null;
        public static ATT_DEFAULT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("default", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_FRAGMENT: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("fragment", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 2, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 3, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_REQUIRED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("required", 4, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 5, true, 1, "op_StringParamType_metaData", 32, -1);
        public static REL_OP_PARAM_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Param_type", 6, false, 26, "type", 32, -1);
        public static REL_OP_DICTIONARYTYPE_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_DictionaryType_params", 7, false, 17, "params", 32, -1);
        public static REL_CONSTRAINTS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("constraints", 8, true, 25, "op_StringParamType_constraints", 32, -1);
        public static getInstance(): org.kevoree.meta.MetaStringParamType {
          if (org.kevoree.meta.MetaStringParamType.INSTANCE == null) {
            org.kevoree.meta.MetaStringParamType.INSTANCE = new org.kevoree.meta.MetaStringParamType();
          }
          return org.kevoree.meta.MetaStringParamType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.StringParamType", 32, null, new Int32Array([24]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(5 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaStringParamType.ATT_DEFAULT;
          temp_all[1] = org.kevoree.meta.MetaStringParamType.ATT_FRAGMENT;
          temp_all[2] = org.kevoree.meta.MetaStringParamType.ATT_NAME;
          temp_all[3] = org.kevoree.meta.MetaStringParamType.ATT_DESCRIPTION;
          temp_all[4] = org.kevoree.meta.MetaStringParamType.ATT_REQUIRED;
          temp_all[5] = org.kevoree.meta.MetaStringParamType.REL_METADATA;
          temp_all[6] = org.kevoree.meta.MetaStringParamType.REL_OP_PARAM_TYPE;
          temp_all[7] = org.kevoree.meta.MetaStringParamType.REL_OP_DICTIONARYTYPE_PARAMS;
          temp_all[8] = org.kevoree.meta.MetaStringParamType.REL_CONSTRAINTS;
          this.init(temp_all);
        }
      }
      export class MetaFragmentDictionary extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaFragmentDictionary = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_FragmentDictionary_metaData", 14, -1);
        public static REL_OP_COMPONENT_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_dictionary", 2, false, 10, "dictionary", 14, -1);
        public static REL_OP_CHANNEL_FRAGMENTDICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_fragmentDictionary", 3, false, 5, "fragmentDictionary", 14, -1);
        public static REL_OP_NODE_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_dictionary", 4, false, 4, "dictionary", 14, -1);
        public static REL_OP_INSTANCE_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_dictionary", 5, false, 7, "dictionary", 14, -1);
        public static REL_OP_CHANNEL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_dictionary", 6, false, 5, "dictionary", 14, -1);
        public static REL_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("params", 7, true, 26, "op_FragmentDictionary_params", 14, -1);
        public static getInstance(): org.kevoree.meta.MetaFragmentDictionary {
          if (org.kevoree.meta.MetaFragmentDictionary.INSTANCE == null) {
            org.kevoree.meta.MetaFragmentDictionary.INSTANCE = new org.kevoree.meta.MetaFragmentDictionary();
          }
          return org.kevoree.meta.MetaFragmentDictionary.INSTANCE;
        }
        constructor() {
          super("org.kevoree.FragmentDictionary", 14, null, new Int32Array([9]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 7 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaFragmentDictionary.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaFragmentDictionary.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaFragmentDictionary.REL_OP_COMPONENT_DICTIONARY;
          temp_all[3] = org.kevoree.meta.MetaFragmentDictionary.REL_OP_CHANNEL_FRAGMENTDICTIONARY;
          temp_all[4] = org.kevoree.meta.MetaFragmentDictionary.REL_OP_NODE_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaFragmentDictionary.REL_OP_INSTANCE_DICTIONARY;
          temp_all[6] = org.kevoree.meta.MetaFragmentDictionary.REL_OP_CHANNEL_DICTIONARY;
          temp_all[7] = org.kevoree.meta.MetaFragmentDictionary.REL_PARAMS;
          this.init(temp_all);
        }
      }
      export class MetaListParam extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaListParam = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 1, true, 1, "op_Param_metaData", 30, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Dictionary_params", 2, false, 9, "params", 30, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_FragmentDictionary_params", 3, false, 14, "params", 30, -1);
        public static REL_VALUES: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("values", 4, true, 31, "op_ListParam_values", 30, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 5, true, 24, "op_Param_type", 30, -1);
        public static getInstance(): org.kevoree.meta.MetaListParam {
          if (org.kevoree.meta.MetaListParam.INSTANCE == null) {
            org.kevoree.meta.MetaListParam.INSTANCE = new org.kevoree.meta.MetaListParam();
          }
          return org.kevoree.meta.MetaListParam.INSTANCE;
        }
        constructor() {
          super("org.kevoree.ListParam", 30, null, new Int32Array([26]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(1 + 5 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaListParam.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaListParam.REL_METADATA;
          temp_all[2] = org.kevoree.meta.MetaListParam.REL_OP_DICTIONARY_PARAMS;
          temp_all[3] = org.kevoree.meta.MetaListParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
          temp_all[4] = org.kevoree.meta.MetaListParam.REL_VALUES;
          temp_all[5] = org.kevoree.meta.MetaListParam.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaStringParam extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaStringParam = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VALUE: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("value", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 2, true, 1, "op_Param_metaData", 27, -1);
        public static REL_OP_DICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Dictionary_params", 3, false, 9, "params", 27, -1);
        public static REL_OP_FRAGMENTDICTIONARY_PARAMS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_FragmentDictionary_params", 4, false, 14, "params", 27, -1);
        public static REL_TYPE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("type", 5, true, 24, "op_Param_type", 27, -1);
        public static getInstance(): org.kevoree.meta.MetaStringParam {
          if (org.kevoree.meta.MetaStringParam.INSTANCE == null) {
            org.kevoree.meta.MetaStringParam.INSTANCE = new org.kevoree.meta.MetaStringParam();
          }
          return org.kevoree.meta.MetaStringParam.INSTANCE;
        }
        constructor() {
          super("org.kevoree.StringParam", 27, null, new Int32Array([26]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaStringParam.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaStringParam.ATT_VALUE;
          temp_all[2] = org.kevoree.meta.MetaStringParam.REL_METADATA;
          temp_all[3] = org.kevoree.meta.MetaStringParam.REL_OP_DICTIONARY_PARAMS;
          temp_all[4] = org.kevoree.meta.MetaStringParam.REL_OP_FRAGMENTDICTIONARY_PARAMS;
          temp_all[5] = org.kevoree.meta.MetaStringParam.REL_TYPE;
          this.init(temp_all);
        }
      }
      export class MetaTypeDefinition extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaTypeDefinition = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, true, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("version", 2, 0, true, -4, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_TypeDefinition_metaData", 8, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 4, true, 17, "op_TypeDefinition_dictionary", 8, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_typeDefinition", 5, false, 4, "typeDefinition", 8, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_typeDefinition", 6, false, 7, "typeDefinition", 8, -1);
        public static REL_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("deployUnits", 7, true, 18, "op_TypeDefinition_deployUnits", 8, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 8, false, 6, "typeDefinitions", 8, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_typeDefinition", 9, false, 10, "typeDefinition", 8, -1);
        public static REL_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("preferedVersions", 10, true, 19, "op_TypeDefinition_preferedVersions", 8, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_typeDefinition", 11, false, 5, "typeDefinition", 8, -1);
        public static getInstance(): org.kevoree.meta.MetaTypeDefinition {
          if (org.kevoree.meta.MetaTypeDefinition.INSTANCE == null) {
            org.kevoree.meta.MetaTypeDefinition.INSTANCE = new org.kevoree.meta.MetaTypeDefinition();
          }
          return org.kevoree.meta.MetaTypeDefinition.INSTANCE;
        }
        constructor() {
          super("org.kevoree.TypeDefinition", 8, null, new Int32Array([0]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(3 + 9 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaTypeDefinition.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaTypeDefinition.ATT_DESCRIPTION;
          temp_all[2] = org.kevoree.meta.MetaTypeDefinition.ATT_VERSION;
          temp_all[3] = org.kevoree.meta.MetaTypeDefinition.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaTypeDefinition.REL_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaTypeDefinition.REL_OP_NODE_TYPEDEFINITION;
          temp_all[6] = org.kevoree.meta.MetaTypeDefinition.REL_OP_INSTANCE_TYPEDEFINITION;
          temp_all[7] = org.kevoree.meta.MetaTypeDefinition.REL_DEPLOYUNITS;
          temp_all[8] = org.kevoree.meta.MetaTypeDefinition.REL_OP_NAMESPACE_TYPEDEFINITIONS;
          temp_all[9] = org.kevoree.meta.MetaTypeDefinition.REL_OP_COMPONENT_TYPEDEFINITION;
          temp_all[10] = org.kevoree.meta.MetaTypeDefinition.REL_PREFEREDVERSIONS;
          temp_all[11] = org.kevoree.meta.MetaTypeDefinition.REL_OP_CHANNEL_TYPEDEFINITION;
          this.init(temp_all);
        }
      }
      export class MetaNumberType extends kmf.kevoree.modeling.meta.impl.MetaEnum implements kmf.kevoree.modeling.KType {
        public static DOUBLE: org.kevoree.NumberType = new org.kevoree.impl.NumberTypeLiteral("DOUBLE", 0, "org.kevoree.NumberType");
        public static FLOAT: org.kevoree.NumberType = new org.kevoree.impl.NumberTypeLiteral("FLOAT", 1, "org.kevoree.NumberType");
        public static INT: org.kevoree.NumberType = new org.kevoree.impl.NumberTypeLiteral("INT", 2, "org.kevoree.NumberType");
        public static LONG: org.kevoree.NumberType = new org.kevoree.impl.NumberTypeLiteral("LONG", 3, "org.kevoree.NumberType");
        public static SHORT: org.kevoree.NumberType = new org.kevoree.impl.NumberTypeLiteral("SHORT", 4, "org.kevoree.NumberType");
        private static INSTANCE: org.kevoree.meta.MetaNumberType;
        public static getInstance(): org.kevoree.meta.MetaNumberType {
          if (org.kevoree.meta.MetaNumberType.INSTANCE == null) {
            org.kevoree.meta.MetaNumberType.INSTANCE = new org.kevoree.meta.MetaNumberType();
          }
          return org.kevoree.meta.MetaNumberType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.NumberType", 0);
          var p_lits_arr: kmf.kevoree.modeling.meta.KLiteral[] = new Array<kmf.kevoree.modeling.meta.KLiteral>(5);
          p_lits_arr[0] = org.kevoree.meta.MetaNumberType.DOUBLE;
          p_lits_arr[1] = org.kevoree.meta.MetaNumberType.FLOAT;
          p_lits_arr[2] = org.kevoree.meta.MetaNumberType.INT;
          p_lits_arr[3] = org.kevoree.meta.MetaNumberType.LONG;
          p_lits_arr[4] = org.kevoree.meta.MetaNumberType.SHORT;
          this.init(p_lits_arr);
        }
      }
      export class MetaNodeType extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaNodeType = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_DESCRIPTION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("description", 1, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_VERSION: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("version", 2, 0, false, -4, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_NodeType_metaData", 20, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 4, true, 17, "op_NodeType_dictionary", 20, 1);
        public static REL_OP_NODE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Node_typeDefinition", 5, false, 4, "typeDefinition", 20, -1);
        public static REL_OP_INSTANCE_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Instance_typeDefinition", 6, false, 7, "typeDefinition", 20, -1);
        public static REL_DEPLOYUNITS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("deployUnits", 7, true, 18, "op_NodeType_deployUnits", 20, -1);
        public static REL_OP_NAMESPACE_TYPEDEFINITIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Namespace_typeDefinitions", 8, false, 6, "typeDefinitions", 20, -1);
        public static REL_OP_COMPONENT_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Component_typeDefinition", 9, false, 10, "typeDefinition", 20, -1);
        public static REL_PREFEREDVERSIONS: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("preferedVersions", 10, true, 19, "op_NodeType_preferedVersions", 20, -1);
        public static REL_OP_CHANNEL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("op_Channel_typeDefinition", 11, false, 5, "typeDefinition", 20, -1);
        public static getInstance(): org.kevoree.meta.MetaNodeType {
          if (org.kevoree.meta.MetaNodeType.INSTANCE == null) {
            org.kevoree.meta.MetaNodeType.INSTANCE = new org.kevoree.meta.MetaNodeType();
          }
          return org.kevoree.meta.MetaNodeType.INSTANCE;
        }
        constructor() {
          super("org.kevoree.NodeType", 20, null, new Int32Array([8]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(3 + 9 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaNodeType.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaNodeType.ATT_DESCRIPTION;
          temp_all[2] = org.kevoree.meta.MetaNodeType.ATT_VERSION;
          temp_all[3] = org.kevoree.meta.MetaNodeType.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaNodeType.REL_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaNodeType.REL_OP_NODE_TYPEDEFINITION;
          temp_all[6] = org.kevoree.meta.MetaNodeType.REL_OP_INSTANCE_TYPEDEFINITION;
          temp_all[7] = org.kevoree.meta.MetaNodeType.REL_DEPLOYUNITS;
          temp_all[8] = org.kevoree.meta.MetaNodeType.REL_OP_NAMESPACE_TYPEDEFINITIONS;
          temp_all[9] = org.kevoree.meta.MetaNodeType.REL_OP_COMPONENT_TYPEDEFINITION;
          temp_all[10] = org.kevoree.meta.MetaNodeType.REL_PREFEREDVERSIONS;
          temp_all[11] = org.kevoree.meta.MetaNodeType.REL_OP_CHANNEL_TYPEDEFINITION;
          this.init(temp_all);
        }
      }
      export class MetaConnector extends kmf.kevoree.modeling.meta.impl.MetaClass {
        private static INSTANCE: org.kevoree.meta.MetaConnector = null;
        public static ATT_NAME: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("name", 0, 0, false, -2, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static ATT_STARTED: kmf.kevoree.modeling.meta.KMetaAttribute = new kmf.kevoree.modeling.meta.impl.MetaAttribute("started", 1, 0, false, -1, kmf.kevoree.modeling.extrapolation.impl.DiscreteExtrapolation.instance());
        public static REL_NODE: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("node", 2, true, 4, "connector", 11, 1);
        public static REL_METADATA: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("metaData", 3, true, 1, "op_Instance_metaData", 11, -1);
        public static REL_DICTIONARY: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("dictionary", 4, true, 9, "op_Instance_dictionary", 11, 1);
        public static REL_TYPEDEFINITION: kmf.kevoree.modeling.meta.KMetaRelation = new kmf.kevoree.modeling.meta.impl.MetaRelation("typeDefinition", 5, true, 8, "op_Instance_typeDefinition", 11, 1);
        public static getInstance(): org.kevoree.meta.MetaConnector {
          if (org.kevoree.meta.MetaConnector.INSTANCE == null) {
            org.kevoree.meta.MetaConnector.INSTANCE = new org.kevoree.meta.MetaConnector();
          }
          return org.kevoree.meta.MetaConnector.INSTANCE;
        }
        constructor() {
          super("org.kevoree.Connector", 11, null, new Int32Array([7]));
          var temp_all: kmf.kevoree.modeling.meta.KMeta[] = new Array<kmf.kevoree.modeling.meta.KMeta>(2 + 4 + 0 + 0 + 0);
          temp_all[0] = org.kevoree.meta.MetaConnector.ATT_NAME;
          temp_all[1] = org.kevoree.meta.MetaConnector.ATT_STARTED;
          temp_all[2] = org.kevoree.meta.MetaConnector.REL_NODE;
          temp_all[3] = org.kevoree.meta.MetaConnector.REL_METADATA;
          temp_all[4] = org.kevoree.meta.MetaConnector.REL_DICTIONARY;
          temp_all[5] = org.kevoree.meta.MetaConnector.REL_TYPEDEFINITION;
          this.init(temp_all);
        }
      }
    }
    export interface Channel extends kmf.kevoree.modeling.KObject, org.kevoree.Instance {
      getName(): string;
      setName(p_obj: string): org.kevoree.Channel;
      getStarted(): boolean;
      setStarted(p_obj: boolean): org.kevoree.Channel;
      addOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Channel;
      removeOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Channel;
      getOutputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.OutputPort[]>): void;
      sizeOfOutputs(): number;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Channel;
      removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Channel;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void;
      sizeOfDictionary(): number;
      addInputs(p_obj: org.kevoree.InputPort): org.kevoree.Channel;
      removeInputs(p_obj: org.kevoree.InputPort): org.kevoree.Channel;
      getInputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.InputPort[]>): void;
      sizeOfInputs(): number;
      addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Channel;
      removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Channel;
      getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void;
      sizeOfTypeDefinition(): number;
      addFragmentDictionary(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel;
      removeFragmentDictionary(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel;
      getFragmentDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.FragmentDictionary[]>): void;
      sizeOfFragmentDictionary(): number;
    }
    export interface Connector extends kmf.kevoree.modeling.KObject, org.kevoree.Instance {
      getName(): string;
      setName(p_obj: string): org.kevoree.Connector;
      getStarted(): boolean;
      setStarted(p_obj: boolean): org.kevoree.Connector;
      addNode(p_obj: org.kevoree.Node): org.kevoree.Connector;
      removeNode(p_obj: org.kevoree.Node): org.kevoree.Connector;
      getNode(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void;
      sizeOfNode(): number;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Connector;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Connector;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Connector;
      removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Connector;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void;
      sizeOfDictionary(): number;
      addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Connector;
      removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Connector;
      getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void;
      sizeOfTypeDefinition(): number;
    }
    export namespace impl {
      export class ElementImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Element {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Element {
          this.add(org.kevoree.meta.MetaElement.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Element {
          this.remove(org.kevoree.meta.MetaElement.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaElement.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaElement.REL_METADATA);
        }
      }
      export class FragmentDictionaryImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.FragmentDictionary {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaFragmentDictionary.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.FragmentDictionary {
          this.set(org.kevoree.meta.MetaFragmentDictionary.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary {
          this.add(org.kevoree.meta.MetaFragmentDictionary.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.FragmentDictionary {
          this.remove(org.kevoree.meta.MetaFragmentDictionary.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaFragmentDictionary.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaFragmentDictionary.REL_METADATA);
        }
        public addParams(p_obj: org.kevoree.Param): org.kevoree.FragmentDictionary {
          this.add(org.kevoree.meta.MetaFragmentDictionary.REL_PARAMS, p_obj);
          return this;
        }
        public removeParams(p_obj: org.kevoree.Param): org.kevoree.FragmentDictionary {
          this.remove(org.kevoree.meta.MetaFragmentDictionary.REL_PARAMS, p_obj);
          return this;
        }
        public getParams(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Param[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaFragmentDictionary.REL_PARAMS, (kObjects) => {
            var casted: org.kevoree.Param[] = new Array<org.kevoree.Param>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Param>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfParams(): number {
          return this.size(org.kevoree.meta.MetaFragmentDictionary.REL_PARAMS);
        }
      }
      export class ChannelImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Channel {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaChannel.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Channel {
          this.set(org.kevoree.meta.MetaChannel.ATT_NAME, p_obj);
          return this;
        }
        public getStarted(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaChannel.ATT_STARTED);
        }
        public setStarted(p_obj: boolean): org.kevoree.Channel {
          this.set(org.kevoree.meta.MetaChannel.ATT_STARTED, p_obj);
          return this;
        }
        public addOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Channel {
          this.add(org.kevoree.meta.MetaChannel.REL_OUTPUTS, p_obj);
          return this;
        }
        public removeOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Channel {
          this.remove(org.kevoree.meta.MetaChannel.REL_OUTPUTS, p_obj);
          return this;
        }
        public getOutputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.OutputPort[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannel.REL_OUTPUTS, (kObjects) => {
            var casted: org.kevoree.OutputPort[] = new Array<org.kevoree.OutputPort>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.OutputPort>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfOutputs(): number {
          return this.size(org.kevoree.meta.MetaChannel.REL_OUTPUTS);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel {
          this.add(org.kevoree.meta.MetaChannel.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Channel {
          this.remove(org.kevoree.meta.MetaChannel.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannel.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaChannel.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Channel {
          this.add(org.kevoree.meta.MetaChannel.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Channel {
          this.remove(org.kevoree.meta.MetaChannel.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannel.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.Dictionary[] = new Array<org.kevoree.Dictionary>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Dictionary>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaChannel.REL_DICTIONARY);
        }
        public addInputs(p_obj: org.kevoree.InputPort): org.kevoree.Channel {
          this.add(org.kevoree.meta.MetaChannel.REL_INPUTS, p_obj);
          return this;
        }
        public removeInputs(p_obj: org.kevoree.InputPort): org.kevoree.Channel {
          this.remove(org.kevoree.meta.MetaChannel.REL_INPUTS, p_obj);
          return this;
        }
        public getInputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.InputPort[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannel.REL_INPUTS, (kObjects) => {
            var casted: org.kevoree.InputPort[] = new Array<org.kevoree.InputPort>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.InputPort>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfInputs(): number {
          return this.size(org.kevoree.meta.MetaChannel.REL_INPUTS);
        }
        public addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Channel {
          this.add(org.kevoree.meta.MetaChannel.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Channel {
          this.remove(org.kevoree.meta.MetaChannel.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannel.REL_TYPEDEFINITION, (kObjects) => {
            var casted: org.kevoree.TypeDefinition[] = new Array<org.kevoree.TypeDefinition>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.TypeDefinition>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfTypeDefinition(): number {
          return this.size(org.kevoree.meta.MetaChannel.REL_TYPEDEFINITION);
        }
        public addFragmentDictionary(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel {
          this.add(org.kevoree.meta.MetaChannel.REL_FRAGMENTDICTIONARY, p_obj);
          return this;
        }
        public removeFragmentDictionary(p_obj: org.kevoree.FragmentDictionary): org.kevoree.Channel {
          this.remove(org.kevoree.meta.MetaChannel.REL_FRAGMENTDICTIONARY, p_obj);
          return this;
        }
        public getFragmentDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.FragmentDictionary[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannel.REL_FRAGMENTDICTIONARY, (kObjects) => {
            var casted: org.kevoree.FragmentDictionary[] = new Array<org.kevoree.FragmentDictionary>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.FragmentDictionary>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfFragmentDictionary(): number {
          return this.size(org.kevoree.meta.MetaChannel.REL_FRAGMENTDICTIONARY);
        }
      }
      export class ListParamImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ListParam {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaListParam.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.ListParam {
          this.set(org.kevoree.meta.MetaListParam.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParam {
          this.add(org.kevoree.meta.MetaListParam.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParam {
          this.remove(org.kevoree.meta.MetaListParam.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaListParam.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaListParam.REL_METADATA);
        }
        public addValues(p_obj: org.kevoree.Item): org.kevoree.ListParam {
          this.add(org.kevoree.meta.MetaListParam.REL_VALUES, p_obj);
          return this;
        }
        public removeValues(p_obj: org.kevoree.Item): org.kevoree.ListParam {
          this.remove(org.kevoree.meta.MetaListParam.REL_VALUES, p_obj);
          return this;
        }
        public getValues(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Item[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaListParam.REL_VALUES, (kObjects) => {
            var casted: org.kevoree.Item[] = new Array<org.kevoree.Item>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Item>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfValues(): number {
          return this.size(org.kevoree.meta.MetaListParam.REL_VALUES);
        }
        public addType(p_obj: org.kevoree.ParamType): org.kevoree.ListParam {
          this.add(org.kevoree.meta.MetaListParam.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.ParamType): org.kevoree.ListParam {
          this.remove(org.kevoree.meta.MetaListParam.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaListParam.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.ParamType[] = new Array<org.kevoree.ParamType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.ParamType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaListParam.REL_TYPE);
        }
      }
      export class ParamTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ParamType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getFragment(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaParamType.ATT_FRAGMENT);
        }
        public setFragment(p_obj: boolean): org.kevoree.ParamType {
          this.set(org.kevoree.meta.MetaParamType.ATT_FRAGMENT, p_obj);
          return this;
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaParamType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.ParamType {
          this.set(org.kevoree.meta.MetaParamType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaParamType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.ParamType {
          this.set(org.kevoree.meta.MetaParamType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getRequired(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaParamType.ATT_REQUIRED);
        }
        public setRequired(p_obj: boolean): org.kevoree.ParamType {
          this.set(org.kevoree.meta.MetaParamType.ATT_REQUIRED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.ParamType {
          this.add(org.kevoree.meta.MetaParamType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ParamType {
          this.remove(org.kevoree.meta.MetaParamType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaParamType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaParamType.REL_METADATA);
        }
        public addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ParamType {
          this.add(org.kevoree.meta.MetaParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ParamType {
          this.remove(org.kevoree.meta.MetaParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaParamType.REL_CONSTRAINTS, (kObjects) => {
            var casted: org.kevoree.AbstractConstraint[] = new Array<org.kevoree.AbstractConstraint>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.AbstractConstraint>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfConstraints(): number {
          return this.size(org.kevoree.meta.MetaParamType.REL_CONSTRAINTS);
        }
      }
      export class PreferedVersionImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.PreferedVersion {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaPreferedVersion.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.PreferedVersion {
          this.set(org.kevoree.meta.MetaPreferedVersion.ATT_NAME, p_obj);
          return this;
        }
        public getVersion(): string {
          return <string>this.get(org.kevoree.meta.MetaPreferedVersion.ATT_VERSION);
        }
        public setVersion(p_obj: string): org.kevoree.PreferedVersion {
          this.set(org.kevoree.meta.MetaPreferedVersion.ATT_VERSION, p_obj);
          return this;
        }
        public getPlatform(): string {
          return <string>this.get(org.kevoree.meta.MetaPreferedVersion.ATT_PLATFORM);
        }
        public setPlatform(p_obj: string): org.kevoree.PreferedVersion {
          this.set(org.kevoree.meta.MetaPreferedVersion.ATT_PLATFORM, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.PreferedVersion {
          this.add(org.kevoree.meta.MetaPreferedVersion.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.PreferedVersion {
          this.remove(org.kevoree.meta.MetaPreferedVersion.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaPreferedVersion.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaPreferedVersion.REL_METADATA);
        }
      }
      export class ValueImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Value {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaValue.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Value {
          this.set(org.kevoree.meta.MetaValue.ATT_NAME, p_obj);
          return this;
        }
        public getValue(): string {
          return <string>this.get(org.kevoree.meta.MetaValue.ATT_VALUE);
        }
        public setValue(p_obj: string): org.kevoree.Value {
          this.set(org.kevoree.meta.MetaValue.ATT_VALUE, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Value {
          this.add(org.kevoree.meta.MetaValue.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Value {
          this.remove(org.kevoree.meta.MetaValue.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaValue.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaValue.REL_METADATA);
        }
      }
      export class StorageInfoImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.StorageInfo {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getUri(): string {
          return <string>this.get(org.kevoree.meta.MetaStorageInfo.ATT_URI);
        }
        public setUri(p_obj: string): org.kevoree.StorageInfo {
          this.set(org.kevoree.meta.MetaStorageInfo.ATT_URI, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.StorageInfo {
          this.add(org.kevoree.meta.MetaStorageInfo.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.StorageInfo {
          this.remove(org.kevoree.meta.MetaStorageInfo.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaStorageInfo.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaStorageInfo.REL_METADATA);
        }
      }
      export class DictionaryTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.DictionaryType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.DictionaryType {
          this.add(org.kevoree.meta.MetaDictionaryType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.DictionaryType {
          this.remove(org.kevoree.meta.MetaDictionaryType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaDictionaryType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaDictionaryType.REL_METADATA);
        }
        public addParams(p_obj: org.kevoree.ParamType): org.kevoree.DictionaryType {
          this.add(org.kevoree.meta.MetaDictionaryType.REL_PARAMS, p_obj);
          return this;
        }
        public removeParams(p_obj: org.kevoree.ParamType): org.kevoree.DictionaryType {
          this.remove(org.kevoree.meta.MetaDictionaryType.REL_PARAMS, p_obj);
          return this;
        }
        public getParams(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaDictionaryType.REL_PARAMS, (kObjects) => {
            var casted: org.kevoree.ParamType[] = new Array<org.kevoree.ParamType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.ParamType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfParams(): number {
          return this.size(org.kevoree.meta.MetaDictionaryType.REL_PARAMS);
        }
      }
      export class ItemImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Item {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getValue(): string {
          return <string>this.get(org.kevoree.meta.MetaItem.ATT_VALUE);
        }
        public setValue(p_obj: string): org.kevoree.Item {
          this.set(org.kevoree.meta.MetaItem.ATT_VALUE, p_obj);
          return this;
        }
      }
      export class ComponentTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ComponentType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaComponentType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.ComponentType {
          this.set(org.kevoree.meta.MetaComponentType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaComponentType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.ComponentType {
          this.set(org.kevoree.meta.MetaComponentType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getRemote(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaComponentType.ATT_REMOTE);
        }
        public setRemote(p_obj: boolean): org.kevoree.ComponentType {
          this.set(org.kevoree.meta.MetaComponentType.ATT_REMOTE, p_obj);
          return this;
        }
        public getVersion(): number {
          return <number>this.get(org.kevoree.meta.MetaComponentType.ATT_VERSION);
        }
        public setVersion(p_obj: number): org.kevoree.ComponentType {
          this.set(org.kevoree.meta.MetaComponentType.ATT_VERSION, p_obj);
          return this;
        }
        public addInputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType {
          this.add(org.kevoree.meta.MetaComponentType.REL_INPUTTYPES, p_obj);
          return this;
        }
        public removeInputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType {
          this.remove(org.kevoree.meta.MetaComponentType.REL_INPUTTYPES, p_obj);
          return this;
        }
        public getInputTypes(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponentType.REL_INPUTTYPES, (kObjects) => {
            var casted: org.kevoree.PortType[] = new Array<org.kevoree.PortType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PortType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfInputTypes(): number {
          return this.size(org.kevoree.meta.MetaComponentType.REL_INPUTTYPES);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType {
          this.add(org.kevoree.meta.MetaComponentType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType {
          this.remove(org.kevoree.meta.MetaComponentType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponentType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaComponentType.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ComponentType {
          this.add(org.kevoree.meta.MetaComponentType.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ComponentType {
          this.remove(org.kevoree.meta.MetaComponentType.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponentType.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.DictionaryType[] = new Array<org.kevoree.DictionaryType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DictionaryType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaComponentType.REL_DICTIONARY);
        }
        public addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType {
          this.add(org.kevoree.meta.MetaComponentType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType {
          this.remove(org.kevoree.meta.MetaComponentType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponentType.REL_DEPLOYUNITS, (kObjects) => {
            var casted: org.kevoree.DeployUnit[] = new Array<org.kevoree.DeployUnit>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DeployUnit>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDeployUnits(): number {
          return this.size(org.kevoree.meta.MetaComponentType.REL_DEPLOYUNITS);
        }
        public addOutputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType {
          this.add(org.kevoree.meta.MetaComponentType.REL_OUTPUTTYPES, p_obj);
          return this;
        }
        public removeOutputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType {
          this.remove(org.kevoree.meta.MetaComponentType.REL_OUTPUTTYPES, p_obj);
          return this;
        }
        public getOutputTypes(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponentType.REL_OUTPUTTYPES, (kObjects) => {
            var casted: org.kevoree.PortType[] = new Array<org.kevoree.PortType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PortType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfOutputTypes(): number {
          return this.size(org.kevoree.meta.MetaComponentType.REL_OUTPUTTYPES);
        }
        public addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ComponentType {
          this.add(org.kevoree.meta.MetaComponentType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ComponentType {
          this.remove(org.kevoree.meta.MetaComponentType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponentType.REL_PREFEREDVERSIONS, (kObjects) => {
            var casted: org.kevoree.PreferedVersion[] = new Array<org.kevoree.PreferedVersion>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PreferedVersion>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfPreferedVersions(): number {
          return this.size(org.kevoree.meta.MetaComponentType.REL_PREFEREDVERSIONS);
        }
      }
      export class ChoiceParamTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ChoiceParamType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getDefault(): string {
          return <string>this.get(org.kevoree.meta.MetaChoiceParamType.ATT_DEFAULT);
        }
        public setDefault(p_obj: string): org.kevoree.ChoiceParamType {
          this.set(org.kevoree.meta.MetaChoiceParamType.ATT_DEFAULT, p_obj);
          return this;
        }
        public getFragment(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaChoiceParamType.ATT_FRAGMENT);
        }
        public setFragment(p_obj: boolean): org.kevoree.ChoiceParamType {
          this.set(org.kevoree.meta.MetaChoiceParamType.ATT_FRAGMENT, p_obj);
          return this;
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaChoiceParamType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.ChoiceParamType {
          this.set(org.kevoree.meta.MetaChoiceParamType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaChoiceParamType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.ChoiceParamType {
          this.set(org.kevoree.meta.MetaChoiceParamType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getRequired(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaChoiceParamType.ATT_REQUIRED);
        }
        public setRequired(p_obj: boolean): org.kevoree.ChoiceParamType {
          this.set(org.kevoree.meta.MetaChoiceParamType.ATT_REQUIRED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.ChoiceParamType {
          this.add(org.kevoree.meta.MetaChoiceParamType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ChoiceParamType {
          this.remove(org.kevoree.meta.MetaChoiceParamType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChoiceParamType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaChoiceParamType.REL_METADATA);
        }
        public addChoices(p_obj: org.kevoree.Item): org.kevoree.ChoiceParamType {
          this.add(org.kevoree.meta.MetaChoiceParamType.REL_CHOICES, p_obj);
          return this;
        }
        public removeChoices(p_obj: org.kevoree.Item): org.kevoree.ChoiceParamType {
          this.remove(org.kevoree.meta.MetaChoiceParamType.REL_CHOICES, p_obj);
          return this;
        }
        public getChoices(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Item[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChoiceParamType.REL_CHOICES, (kObjects) => {
            var casted: org.kevoree.Item[] = new Array<org.kevoree.Item>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Item>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfChoices(): number {
          return this.size(org.kevoree.meta.MetaChoiceParamType.REL_CHOICES);
        }
        public addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ChoiceParamType {
          this.add(org.kevoree.meta.MetaChoiceParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ChoiceParamType {
          this.remove(org.kevoree.meta.MetaChoiceParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChoiceParamType.REL_CONSTRAINTS, (kObjects) => {
            var casted: org.kevoree.AbstractConstraint[] = new Array<org.kevoree.AbstractConstraint>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.AbstractConstraint>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfConstraints(): number {
          return this.size(org.kevoree.meta.MetaChoiceParamType.REL_CONSTRAINTS);
        }
      }
      export class PortTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.PortType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaPortType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.PortType {
          this.set(org.kevoree.meta.MetaPortType.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType {
          this.add(org.kevoree.meta.MetaPortType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType {
          this.remove(org.kevoree.meta.MetaPortType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaPortType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaPortType.REL_METADATA);
        }
        public addProtocol(p_obj: org.kevoree.Value): org.kevoree.PortType {
          this.add(org.kevoree.meta.MetaPortType.REL_PROTOCOL, p_obj);
          return this;
        }
        public removeProtocol(p_obj: org.kevoree.Value): org.kevoree.PortType {
          this.remove(org.kevoree.meta.MetaPortType.REL_PROTOCOL, p_obj);
          return this;
        }
        public getProtocol(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaPortType.REL_PROTOCOL, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfProtocol(): number {
          return this.size(org.kevoree.meta.MetaPortType.REL_PROTOCOL);
        }
      }
      export class BooleanParamImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.BooleanParam {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaBooleanParam.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.BooleanParam {
          this.set(org.kevoree.meta.MetaBooleanParam.ATT_NAME, p_obj);
          return this;
        }
        public getValue(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaBooleanParam.ATT_VALUE);
        }
        public setValue(p_obj: boolean): org.kevoree.BooleanParam {
          this.set(org.kevoree.meta.MetaBooleanParam.ATT_VALUE, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParam {
          this.add(org.kevoree.meta.MetaBooleanParam.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParam {
          this.remove(org.kevoree.meta.MetaBooleanParam.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaBooleanParam.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaBooleanParam.REL_METADATA);
        }
        public addType(p_obj: org.kevoree.ParamType): org.kevoree.BooleanParam {
          this.add(org.kevoree.meta.MetaBooleanParam.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.ParamType): org.kevoree.BooleanParam {
          this.remove(org.kevoree.meta.MetaBooleanParam.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaBooleanParam.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.ParamType[] = new Array<org.kevoree.ParamType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.ParamType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaBooleanParam.REL_TYPE);
        }
      }
      export class NodeTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.NodeType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaNodeType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.NodeType {
          this.set(org.kevoree.meta.MetaNodeType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaNodeType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.NodeType {
          this.set(org.kevoree.meta.MetaNodeType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getVersion(): number {
          return <number>this.get(org.kevoree.meta.MetaNodeType.ATT_VERSION);
        }
        public setVersion(p_obj: number): org.kevoree.NodeType {
          this.set(org.kevoree.meta.MetaNodeType.ATT_VERSION, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType {
          this.add(org.kevoree.meta.MetaNodeType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NodeType {
          this.remove(org.kevoree.meta.MetaNodeType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNodeType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaNodeType.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.NodeType {
          this.add(org.kevoree.meta.MetaNodeType.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.NodeType {
          this.remove(org.kevoree.meta.MetaNodeType.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNodeType.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.DictionaryType[] = new Array<org.kevoree.DictionaryType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DictionaryType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaNodeType.REL_DICTIONARY);
        }
        public addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType {
          this.add(org.kevoree.meta.MetaNodeType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.NodeType {
          this.remove(org.kevoree.meta.MetaNodeType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNodeType.REL_DEPLOYUNITS, (kObjects) => {
            var casted: org.kevoree.DeployUnit[] = new Array<org.kevoree.DeployUnit>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DeployUnit>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDeployUnits(): number {
          return this.size(org.kevoree.meta.MetaNodeType.REL_DEPLOYUNITS);
        }
        public addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.NodeType {
          this.add(org.kevoree.meta.MetaNodeType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.NodeType {
          this.remove(org.kevoree.meta.MetaNodeType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNodeType.REL_PREFEREDVERSIONS, (kObjects) => {
            var casted: org.kevoree.PreferedVersion[] = new Array<org.kevoree.PreferedVersion>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PreferedVersion>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfPreferedVersions(): number {
          return this.size(org.kevoree.meta.MetaNodeType.REL_PREFEREDVERSIONS);
        }
      }
      export class BooleanParamTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.BooleanParamType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getDefault(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaBooleanParamType.ATT_DEFAULT);
        }
        public setDefault(p_obj: boolean): org.kevoree.BooleanParamType {
          this.set(org.kevoree.meta.MetaBooleanParamType.ATT_DEFAULT, p_obj);
          return this;
        }
        public getFragment(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaBooleanParamType.ATT_FRAGMENT);
        }
        public setFragment(p_obj: boolean): org.kevoree.BooleanParamType {
          this.set(org.kevoree.meta.MetaBooleanParamType.ATT_FRAGMENT, p_obj);
          return this;
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaBooleanParamType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.BooleanParamType {
          this.set(org.kevoree.meta.MetaBooleanParamType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaBooleanParamType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.BooleanParamType {
          this.set(org.kevoree.meta.MetaBooleanParamType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getRequired(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaBooleanParamType.ATT_REQUIRED);
        }
        public setRequired(p_obj: boolean): org.kevoree.BooleanParamType {
          this.set(org.kevoree.meta.MetaBooleanParamType.ATT_REQUIRED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParamType {
          this.add(org.kevoree.meta.MetaBooleanParamType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParamType {
          this.remove(org.kevoree.meta.MetaBooleanParamType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaBooleanParamType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaBooleanParamType.REL_METADATA);
        }
        public addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.BooleanParamType {
          this.add(org.kevoree.meta.MetaBooleanParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.BooleanParamType {
          this.remove(org.kevoree.meta.MetaBooleanParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaBooleanParamType.REL_CONSTRAINTS, (kObjects) => {
            var casted: org.kevoree.AbstractConstraint[] = new Array<org.kevoree.AbstractConstraint>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.AbstractConstraint>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfConstraints(): number {
          return this.size(org.kevoree.meta.MetaBooleanParamType.REL_CONSTRAINTS);
        }
      }
      export class OutputPortImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.OutputPort {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaOutputPort.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.OutputPort {
          this.set(org.kevoree.meta.MetaOutputPort.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.OutputPort {
          this.add(org.kevoree.meta.MetaOutputPort.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.OutputPort {
          this.remove(org.kevoree.meta.MetaOutputPort.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaOutputPort.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaOutputPort.REL_METADATA);
        }
        public addComponents(p_obj: org.kevoree.Component): org.kevoree.OutputPort {
          this.add(org.kevoree.meta.MetaOutputPort.REL_COMPONENTS, p_obj);
          return this;
        }
        public removeComponents(p_obj: org.kevoree.Component): org.kevoree.OutputPort {
          this.remove(org.kevoree.meta.MetaOutputPort.REL_COMPONENTS, p_obj);
          return this;
        }
        public getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaOutputPort.REL_COMPONENTS, (kObjects) => {
            var casted: org.kevoree.Component[] = new Array<org.kevoree.Component>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Component>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfComponents(): number {
          return this.size(org.kevoree.meta.MetaOutputPort.REL_COMPONENTS);
        }
        public addChannels(p_obj: org.kevoree.Channel): org.kevoree.OutputPort {
          this.add(org.kevoree.meta.MetaOutputPort.REL_CHANNELS, p_obj);
          return this;
        }
        public removeChannels(p_obj: org.kevoree.Channel): org.kevoree.OutputPort {
          this.remove(org.kevoree.meta.MetaOutputPort.REL_CHANNELS, p_obj);
          return this;
        }
        public getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaOutputPort.REL_CHANNELS, (kObjects) => {
            var casted: org.kevoree.Channel[] = new Array<org.kevoree.Channel>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Channel>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfChannels(): number {
          return this.size(org.kevoree.meta.MetaOutputPort.REL_CHANNELS);
        }
        public addType(p_obj: org.kevoree.PortType): org.kevoree.OutputPort {
          this.add(org.kevoree.meta.MetaOutputPort.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.PortType): org.kevoree.OutputPort {
          this.remove(org.kevoree.meta.MetaOutputPort.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaOutputPort.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.PortType[] = new Array<org.kevoree.PortType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PortType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaOutputPort.REL_TYPE);
        }
      }
      export class DictionaryImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Dictionary {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Dictionary {
          this.add(org.kevoree.meta.MetaDictionary.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Dictionary {
          this.remove(org.kevoree.meta.MetaDictionary.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaDictionary.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaDictionary.REL_METADATA);
        }
        public addParams(p_obj: org.kevoree.Param): org.kevoree.Dictionary {
          this.add(org.kevoree.meta.MetaDictionary.REL_PARAMS, p_obj);
          return this;
        }
        public removeParams(p_obj: org.kevoree.Param): org.kevoree.Dictionary {
          this.remove(org.kevoree.meta.MetaDictionary.REL_PARAMS, p_obj);
          return this;
        }
        public getParams(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Param[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaDictionary.REL_PARAMS, (kObjects) => {
            var casted: org.kevoree.Param[] = new Array<org.kevoree.Param>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Param>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfParams(): number {
          return this.size(org.kevoree.meta.MetaDictionary.REL_PARAMS);
        }
      }
      export class NumberParamImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.NumberParam {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaNumberParam.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.NumberParam {
          this.set(org.kevoree.meta.MetaNumberParam.ATT_NAME, p_obj);
          return this;
        }
        public getValue(): string {
          return <string>this.get(org.kevoree.meta.MetaNumberParam.ATT_VALUE);
        }
        public setValue(p_obj: string): org.kevoree.NumberParam {
          this.set(org.kevoree.meta.MetaNumberParam.ATT_VALUE, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParam {
          this.add(org.kevoree.meta.MetaNumberParam.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParam {
          this.remove(org.kevoree.meta.MetaNumberParam.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNumberParam.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaNumberParam.REL_METADATA);
        }
        public addType(p_obj: org.kevoree.ParamType): org.kevoree.NumberParam {
          this.add(org.kevoree.meta.MetaNumberParam.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.ParamType): org.kevoree.NumberParam {
          this.remove(org.kevoree.meta.MetaNumberParam.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNumberParam.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.ParamType[] = new Array<org.kevoree.ParamType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.ParamType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaNumberParam.REL_TYPE);
        }
      }
      export class NumberParamTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.NumberParamType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getDefault(): string {
          return <string>this.get(org.kevoree.meta.MetaNumberParamType.ATT_DEFAULT);
        }
        public setDefault(p_obj: string): org.kevoree.NumberParamType {
          this.set(org.kevoree.meta.MetaNumberParamType.ATT_DEFAULT, p_obj);
          return this;
        }
        public getFragment(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaNumberParamType.ATT_FRAGMENT);
        }
        public setFragment(p_obj: boolean): org.kevoree.NumberParamType {
          this.set(org.kevoree.meta.MetaNumberParamType.ATT_FRAGMENT, p_obj);
          return this;
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaNumberParamType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.NumberParamType {
          this.set(org.kevoree.meta.MetaNumberParamType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaNumberParamType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.NumberParamType {
          this.set(org.kevoree.meta.MetaNumberParamType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getType(): org.kevoree.NumberType {
          return <org.kevoree.NumberType>this.get(org.kevoree.meta.MetaNumberParamType.ATT_TYPE);
        }
        public setType(p_obj: org.kevoree.NumberType): org.kevoree.NumberParamType {
          this.set(org.kevoree.meta.MetaNumberParamType.ATT_TYPE, p_obj);
          return this;
        }
        public getRequired(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaNumberParamType.ATT_REQUIRED);
        }
        public setRequired(p_obj: boolean): org.kevoree.NumberParamType {
          this.set(org.kevoree.meta.MetaNumberParamType.ATT_REQUIRED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParamType {
          this.add(org.kevoree.meta.MetaNumberParamType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParamType {
          this.remove(org.kevoree.meta.MetaNumberParamType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNumberParamType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaNumberParamType.REL_METADATA);
        }
        public addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.NumberParamType {
          this.add(org.kevoree.meta.MetaNumberParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.NumberParamType {
          this.remove(org.kevoree.meta.MetaNumberParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNumberParamType.REL_CONSTRAINTS, (kObjects) => {
            var casted: org.kevoree.AbstractConstraint[] = new Array<org.kevoree.AbstractConstraint>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.AbstractConstraint>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfConstraints(): number {
          return this.size(org.kevoree.meta.MetaNumberParamType.REL_CONSTRAINTS);
        }
      }
      export class TypeDefinitionImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.TypeDefinition {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaTypeDefinition.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.TypeDefinition {
          this.set(org.kevoree.meta.MetaTypeDefinition.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaTypeDefinition.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.TypeDefinition {
          this.set(org.kevoree.meta.MetaTypeDefinition.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getVersion(): number {
          return <number>this.get(org.kevoree.meta.MetaTypeDefinition.ATT_VERSION);
        }
        public setVersion(p_obj: number): org.kevoree.TypeDefinition {
          this.set(org.kevoree.meta.MetaTypeDefinition.ATT_VERSION, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition {
          this.add(org.kevoree.meta.MetaTypeDefinition.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition {
          this.remove(org.kevoree.meta.MetaTypeDefinition.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaTypeDefinition.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaTypeDefinition.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.TypeDefinition {
          this.add(org.kevoree.meta.MetaTypeDefinition.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.TypeDefinition {
          this.remove(org.kevoree.meta.MetaTypeDefinition.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaTypeDefinition.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.DictionaryType[] = new Array<org.kevoree.DictionaryType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DictionaryType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaTypeDefinition.REL_DICTIONARY);
        }
        public addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition {
          this.add(org.kevoree.meta.MetaTypeDefinition.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition {
          this.remove(org.kevoree.meta.MetaTypeDefinition.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaTypeDefinition.REL_DEPLOYUNITS, (kObjects) => {
            var casted: org.kevoree.DeployUnit[] = new Array<org.kevoree.DeployUnit>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DeployUnit>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDeployUnits(): number {
          return this.size(org.kevoree.meta.MetaTypeDefinition.REL_DEPLOYUNITS);
        }
        public addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.TypeDefinition {
          this.add(org.kevoree.meta.MetaTypeDefinition.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.TypeDefinition {
          this.remove(org.kevoree.meta.MetaTypeDefinition.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaTypeDefinition.REL_PREFEREDVERSIONS, (kObjects) => {
            var casted: org.kevoree.PreferedVersion[] = new Array<org.kevoree.PreferedVersion>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PreferedVersion>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfPreferedVersions(): number {
          return this.size(org.kevoree.meta.MetaTypeDefinition.REL_PREFEREDVERSIONS);
        }
      }
      export class StringParamImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.StringParam {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaStringParam.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.StringParam {
          this.set(org.kevoree.meta.MetaStringParam.ATT_NAME, p_obj);
          return this;
        }
        public getValue(): string {
          return <string>this.get(org.kevoree.meta.MetaStringParam.ATT_VALUE);
        }
        public setValue(p_obj: string): org.kevoree.StringParam {
          this.set(org.kevoree.meta.MetaStringParam.ATT_VALUE, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParam {
          this.add(org.kevoree.meta.MetaStringParam.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParam {
          this.remove(org.kevoree.meta.MetaStringParam.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaStringParam.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaStringParam.REL_METADATA);
        }
        public addType(p_obj: org.kevoree.ParamType): org.kevoree.StringParam {
          this.add(org.kevoree.meta.MetaStringParam.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.ParamType): org.kevoree.StringParam {
          this.remove(org.kevoree.meta.MetaStringParam.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaStringParam.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.ParamType[] = new Array<org.kevoree.ParamType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.ParamType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaStringParam.REL_TYPE);
        }
      }
      export class MaxConstraintImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.MaxConstraint {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getExclusive(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaMaxConstraint.ATT_EXCLUSIVE);
        }
        public setExclusive(p_obj: boolean): org.kevoree.MaxConstraint {
          this.set(org.kevoree.meta.MetaMaxConstraint.ATT_EXCLUSIVE, p_obj);
          return this;
        }
        public getValue(): number {
          return <number>this.get(org.kevoree.meta.MetaMaxConstraint.ATT_VALUE);
        }
        public setValue(p_obj: number): org.kevoree.MaxConstraint {
          this.set(org.kevoree.meta.MetaMaxConstraint.ATT_VALUE, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.MaxConstraint {
          this.add(org.kevoree.meta.MetaMaxConstraint.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.MaxConstraint {
          this.remove(org.kevoree.meta.MetaMaxConstraint.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaMaxConstraint.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaMaxConstraint.REL_METADATA);
        }
      }
      export class NamespaceImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Namespace {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaNamespace.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Namespace {
          this.set(org.kevoree.meta.MetaNamespace.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Namespace {
          this.add(org.kevoree.meta.MetaNamespace.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Namespace {
          this.remove(org.kevoree.meta.MetaNamespace.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNamespace.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaNamespace.REL_METADATA);
        }
        public addTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace {
          this.add(org.kevoree.meta.MetaNamespace.REL_TYPEDEFINITIONS, p_obj);
          return this;
        }
        public removeTypeDefinitions(p_obj: org.kevoree.TypeDefinition): org.kevoree.Namespace {
          this.remove(org.kevoree.meta.MetaNamespace.REL_TYPEDEFINITIONS, p_obj);
          return this;
        }
        public getTypeDefinitions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNamespace.REL_TYPEDEFINITIONS, (kObjects) => {
            var casted: org.kevoree.TypeDefinition[] = new Array<org.kevoree.TypeDefinition>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.TypeDefinition>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfTypeDefinitions(): number {
          return this.size(org.kevoree.meta.MetaNamespace.REL_TYPEDEFINITIONS);
        }
      }
      export class DeployUnitImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.DeployUnit {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaDeployUnit.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.DeployUnit {
          this.set(org.kevoree.meta.MetaDeployUnit.ATT_NAME, p_obj);
          return this;
        }
        public getVersion(): string {
          return <string>this.get(org.kevoree.meta.MetaDeployUnit.ATT_VERSION);
        }
        public setVersion(p_obj: string): org.kevoree.DeployUnit {
          this.set(org.kevoree.meta.MetaDeployUnit.ATT_VERSION, p_obj);
          return this;
        }
        public getPlatform(): string {
          return <string>this.get(org.kevoree.meta.MetaDeployUnit.ATT_PLATFORM);
        }
        public setPlatform(p_obj: string): org.kevoree.DeployUnit {
          this.set(org.kevoree.meta.MetaDeployUnit.ATT_PLATFORM, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit {
          this.add(org.kevoree.meta.MetaDeployUnit.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.DeployUnit {
          this.remove(org.kevoree.meta.MetaDeployUnit.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaDeployUnit.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaDeployUnit.REL_METADATA);
        }
      }
      export class ParamImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Param {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaParam.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Param {
          this.set(org.kevoree.meta.MetaParam.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Param {
          this.add(org.kevoree.meta.MetaParam.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Param {
          this.remove(org.kevoree.meta.MetaParam.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaParam.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaParam.REL_METADATA);
        }
        public addType(p_obj: org.kevoree.ParamType): org.kevoree.Param {
          this.add(org.kevoree.meta.MetaParam.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.ParamType): org.kevoree.Param {
          this.remove(org.kevoree.meta.MetaParam.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaParam.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.ParamType[] = new Array<org.kevoree.ParamType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.ParamType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaParam.REL_TYPE);
        }
      }
      export class InputPortImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.InputPort {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaInputPort.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.InputPort {
          this.set(org.kevoree.meta.MetaInputPort.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.InputPort {
          this.add(org.kevoree.meta.MetaInputPort.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.InputPort {
          this.remove(org.kevoree.meta.MetaInputPort.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaInputPort.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaInputPort.REL_METADATA);
        }
        public addComponents(p_obj: org.kevoree.Component): org.kevoree.InputPort {
          this.add(org.kevoree.meta.MetaInputPort.REL_COMPONENTS, p_obj);
          return this;
        }
        public removeComponents(p_obj: org.kevoree.Component): org.kevoree.InputPort {
          this.remove(org.kevoree.meta.MetaInputPort.REL_COMPONENTS, p_obj);
          return this;
        }
        public getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaInputPort.REL_COMPONENTS, (kObjects) => {
            var casted: org.kevoree.Component[] = new Array<org.kevoree.Component>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Component>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfComponents(): number {
          return this.size(org.kevoree.meta.MetaInputPort.REL_COMPONENTS);
        }
        public addChannels(p_obj: org.kevoree.Channel): org.kevoree.InputPort {
          this.add(org.kevoree.meta.MetaInputPort.REL_CHANNELS, p_obj);
          return this;
        }
        public removeChannels(p_obj: org.kevoree.Channel): org.kevoree.InputPort {
          this.remove(org.kevoree.meta.MetaInputPort.REL_CHANNELS, p_obj);
          return this;
        }
        public getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaInputPort.REL_CHANNELS, (kObjects) => {
            var casted: org.kevoree.Channel[] = new Array<org.kevoree.Channel>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Channel>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfChannels(): number {
          return this.size(org.kevoree.meta.MetaInputPort.REL_CHANNELS);
        }
        public addType(p_obj: org.kevoree.PortType): org.kevoree.InputPort {
          this.add(org.kevoree.meta.MetaInputPort.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.PortType): org.kevoree.InputPort {
          this.remove(org.kevoree.meta.MetaInputPort.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaInputPort.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.PortType[] = new Array<org.kevoree.PortType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PortType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaInputPort.REL_TYPE);
        }
      }
      export class AbstractConstraintImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.AbstractConstraint {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.AbstractConstraint {
          this.add(org.kevoree.meta.MetaAbstractConstraint.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.AbstractConstraint {
          this.remove(org.kevoree.meta.MetaAbstractConstraint.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaAbstractConstraint.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaAbstractConstraint.REL_METADATA);
        }
      }
      export class MultilineConstraintImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.MultilineConstraint {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getValue(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaMultilineConstraint.ATT_VALUE);
        }
        public setValue(p_obj: boolean): org.kevoree.MultilineConstraint {
          this.set(org.kevoree.meta.MetaMultilineConstraint.ATT_VALUE, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.MultilineConstraint {
          this.add(org.kevoree.meta.MetaMultilineConstraint.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.MultilineConstraint {
          this.remove(org.kevoree.meta.MetaMultilineConstraint.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaMultilineConstraint.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaMultilineConstraint.REL_METADATA);
        }
      }
      export class ConnectorTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ConnectorType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaConnectorType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.ConnectorType {
          this.set(org.kevoree.meta.MetaConnectorType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaConnectorType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.ConnectorType {
          this.set(org.kevoree.meta.MetaConnectorType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getVersion(): number {
          return <number>this.get(org.kevoree.meta.MetaConnectorType.ATT_VERSION);
        }
        public setVersion(p_obj: number): org.kevoree.ConnectorType {
          this.set(org.kevoree.meta.MetaConnectorType.ATT_VERSION, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.ConnectorType {
          this.add(org.kevoree.meta.MetaConnectorType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ConnectorType {
          this.remove(org.kevoree.meta.MetaConnectorType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnectorType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaConnectorType.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ConnectorType {
          this.add(org.kevoree.meta.MetaConnectorType.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ConnectorType {
          this.remove(org.kevoree.meta.MetaConnectorType.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnectorType.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.DictionaryType[] = new Array<org.kevoree.DictionaryType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DictionaryType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaConnectorType.REL_DICTIONARY);
        }
        public addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ConnectorType {
          this.add(org.kevoree.meta.MetaConnectorType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ConnectorType {
          this.remove(org.kevoree.meta.MetaConnectorType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnectorType.REL_DEPLOYUNITS, (kObjects) => {
            var casted: org.kevoree.DeployUnit[] = new Array<org.kevoree.DeployUnit>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DeployUnit>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDeployUnits(): number {
          return this.size(org.kevoree.meta.MetaConnectorType.REL_DEPLOYUNITS);
        }
        public addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ConnectorType {
          this.add(org.kevoree.meta.MetaConnectorType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ConnectorType {
          this.remove(org.kevoree.meta.MetaConnectorType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnectorType.REL_PREFEREDVERSIONS, (kObjects) => {
            var casted: org.kevoree.PreferedVersion[] = new Array<org.kevoree.PreferedVersion>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PreferedVersion>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfPreferedVersions(): number {
          return this.size(org.kevoree.meta.MetaConnectorType.REL_PREFEREDVERSIONS);
        }
      }
      export class InstanceImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Instance {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaInstance.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Instance {
          this.set(org.kevoree.meta.MetaInstance.ATT_NAME, p_obj);
          return this;
        }
        public getStarted(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaInstance.ATT_STARTED);
        }
        public setStarted(p_obj: boolean): org.kevoree.Instance {
          this.set(org.kevoree.meta.MetaInstance.ATT_STARTED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance {
          this.add(org.kevoree.meta.MetaInstance.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Instance {
          this.remove(org.kevoree.meta.MetaInstance.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaInstance.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaInstance.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Instance {
          this.add(org.kevoree.meta.MetaInstance.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Instance {
          this.remove(org.kevoree.meta.MetaInstance.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaInstance.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.Dictionary[] = new Array<org.kevoree.Dictionary>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Dictionary>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaInstance.REL_DICTIONARY);
        }
        public addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Instance {
          this.add(org.kevoree.meta.MetaInstance.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Instance {
          this.remove(org.kevoree.meta.MetaInstance.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaInstance.REL_TYPEDEFINITION, (kObjects) => {
            var casted: org.kevoree.TypeDefinition[] = new Array<org.kevoree.TypeDefinition>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.TypeDefinition>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfTypeDefinition(): number {
          return this.size(org.kevoree.meta.MetaInstance.REL_TYPEDEFINITION);
        }
      }
      export class ListParamTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ListParamType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getFragment(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaListParamType.ATT_FRAGMENT);
        }
        public setFragment(p_obj: boolean): org.kevoree.ListParamType {
          this.set(org.kevoree.meta.MetaListParamType.ATT_FRAGMENT, p_obj);
          return this;
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaListParamType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.ListParamType {
          this.set(org.kevoree.meta.MetaListParamType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaListParamType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.ListParamType {
          this.set(org.kevoree.meta.MetaListParamType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getRequired(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaListParamType.ATT_REQUIRED);
        }
        public setRequired(p_obj: boolean): org.kevoree.ListParamType {
          this.set(org.kevoree.meta.MetaListParamType.ATT_REQUIRED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParamType {
          this.add(org.kevoree.meta.MetaListParamType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParamType {
          this.remove(org.kevoree.meta.MetaListParamType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaListParamType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaListParamType.REL_METADATA);
        }
        public addDefault(p_obj: org.kevoree.Item): org.kevoree.ListParamType {
          this.add(org.kevoree.meta.MetaListParamType.REL_DEFAULT, p_obj);
          return this;
        }
        public removeDefault(p_obj: org.kevoree.Item): org.kevoree.ListParamType {
          this.remove(org.kevoree.meta.MetaListParamType.REL_DEFAULT, p_obj);
          return this;
        }
        public getDefault(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Item[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaListParamType.REL_DEFAULT, (kObjects) => {
            var casted: org.kevoree.Item[] = new Array<org.kevoree.Item>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Item>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDefault(): number {
          return this.size(org.kevoree.meta.MetaListParamType.REL_DEFAULT);
        }
        public addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ListParamType {
          this.add(org.kevoree.meta.MetaListParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ListParamType {
          this.remove(org.kevoree.meta.MetaListParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaListParamType.REL_CONSTRAINTS, (kObjects) => {
            var casted: org.kevoree.AbstractConstraint[] = new Array<org.kevoree.AbstractConstraint>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.AbstractConstraint>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfConstraints(): number {
          return this.size(org.kevoree.meta.MetaListParamType.REL_CONSTRAINTS);
        }
      }
      export class PortImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Port {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaPort.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Port {
          this.set(org.kevoree.meta.MetaPort.ATT_NAME, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Port {
          this.add(org.kevoree.meta.MetaPort.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Port {
          this.remove(org.kevoree.meta.MetaPort.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaPort.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaPort.REL_METADATA);
        }
        public addComponents(p_obj: org.kevoree.Component): org.kevoree.Port {
          this.add(org.kevoree.meta.MetaPort.REL_COMPONENTS, p_obj);
          return this;
        }
        public removeComponents(p_obj: org.kevoree.Component): org.kevoree.Port {
          this.remove(org.kevoree.meta.MetaPort.REL_COMPONENTS, p_obj);
          return this;
        }
        public getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaPort.REL_COMPONENTS, (kObjects) => {
            var casted: org.kevoree.Component[] = new Array<org.kevoree.Component>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Component>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfComponents(): number {
          return this.size(org.kevoree.meta.MetaPort.REL_COMPONENTS);
        }
        public addChannels(p_obj: org.kevoree.Channel): org.kevoree.Port {
          this.add(org.kevoree.meta.MetaPort.REL_CHANNELS, p_obj);
          return this;
        }
        public removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Port {
          this.remove(org.kevoree.meta.MetaPort.REL_CHANNELS, p_obj);
          return this;
        }
        public getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaPort.REL_CHANNELS, (kObjects) => {
            var casted: org.kevoree.Channel[] = new Array<org.kevoree.Channel>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Channel>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfChannels(): number {
          return this.size(org.kevoree.meta.MetaPort.REL_CHANNELS);
        }
        public addType(p_obj: org.kevoree.PortType): org.kevoree.Port {
          this.add(org.kevoree.meta.MetaPort.REL_TYPE, p_obj);
          return this;
        }
        public removeType(p_obj: org.kevoree.PortType): org.kevoree.Port {
          this.remove(org.kevoree.meta.MetaPort.REL_TYPE, p_obj);
          return this;
        }
        public getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaPort.REL_TYPE, (kObjects) => {
            var casted: org.kevoree.PortType[] = new Array<org.kevoree.PortType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PortType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfType(): number {
          return this.size(org.kevoree.meta.MetaPort.REL_TYPE);
        }
      }
      export class StringParamTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.StringParamType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getDefault(): string {
          return <string>this.get(org.kevoree.meta.MetaStringParamType.ATT_DEFAULT);
        }
        public setDefault(p_obj: string): org.kevoree.StringParamType {
          this.set(org.kevoree.meta.MetaStringParamType.ATT_DEFAULT, p_obj);
          return this;
        }
        public getFragment(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaStringParamType.ATT_FRAGMENT);
        }
        public setFragment(p_obj: boolean): org.kevoree.StringParamType {
          this.set(org.kevoree.meta.MetaStringParamType.ATT_FRAGMENT, p_obj);
          return this;
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaStringParamType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.StringParamType {
          this.set(org.kevoree.meta.MetaStringParamType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaStringParamType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.StringParamType {
          this.set(org.kevoree.meta.MetaStringParamType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getRequired(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaStringParamType.ATT_REQUIRED);
        }
        public setRequired(p_obj: boolean): org.kevoree.StringParamType {
          this.set(org.kevoree.meta.MetaStringParamType.ATT_REQUIRED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParamType {
          this.add(org.kevoree.meta.MetaStringParamType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParamType {
          this.remove(org.kevoree.meta.MetaStringParamType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaStringParamType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaStringParamType.REL_METADATA);
        }
        public addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.StringParamType {
          this.add(org.kevoree.meta.MetaStringParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.StringParamType {
          this.remove(org.kevoree.meta.MetaStringParamType.REL_CONSTRAINTS, p_obj);
          return this;
        }
        public getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaStringParamType.REL_CONSTRAINTS, (kObjects) => {
            var casted: org.kevoree.AbstractConstraint[] = new Array<org.kevoree.AbstractConstraint>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.AbstractConstraint>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfConstraints(): number {
          return this.size(org.kevoree.meta.MetaStringParamType.REL_CONSTRAINTS);
        }
      }
      export class NumberTypeLiteral extends kmf.kevoree.modeling.meta.impl.MetaLiteral implements org.kevoree.NumberType {
        constructor(p_name: string, p_index: number, p_className: string) {
          super(p_name, p_index, p_className);
        }
      }
      export class ComponentImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Component {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaComponent.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Component {
          this.set(org.kevoree.meta.MetaComponent.ATT_NAME, p_obj);
          return this;
        }
        public getStarted(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaComponent.ATT_STARTED);
        }
        public setStarted(p_obj: boolean): org.kevoree.Component {
          this.set(org.kevoree.meta.MetaComponent.ATT_STARTED, p_obj);
          return this;
        }
        public addOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Component {
          this.add(org.kevoree.meta.MetaComponent.REL_OUTPUTS, p_obj);
          return this;
        }
        public removeOutputs(p_obj: org.kevoree.OutputPort): org.kevoree.Component {
          this.remove(org.kevoree.meta.MetaComponent.REL_OUTPUTS, p_obj);
          return this;
        }
        public getOutputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.OutputPort[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponent.REL_OUTPUTS, (kObjects) => {
            var casted: org.kevoree.OutputPort[] = new Array<org.kevoree.OutputPort>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.OutputPort>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfOutputs(): number {
          return this.size(org.kevoree.meta.MetaComponent.REL_OUTPUTS);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Component {
          this.add(org.kevoree.meta.MetaComponent.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Component {
          this.remove(org.kevoree.meta.MetaComponent.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponent.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaComponent.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Component {
          this.add(org.kevoree.meta.MetaComponent.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Component {
          this.remove(org.kevoree.meta.MetaComponent.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponent.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.Dictionary[] = new Array<org.kevoree.Dictionary>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Dictionary>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaComponent.REL_DICTIONARY);
        }
        public addInputs(p_obj: org.kevoree.InputPort): org.kevoree.Component {
          this.add(org.kevoree.meta.MetaComponent.REL_INPUTS, p_obj);
          return this;
        }
        public removeInputs(p_obj: org.kevoree.InputPort): org.kevoree.Component {
          this.remove(org.kevoree.meta.MetaComponent.REL_INPUTS, p_obj);
          return this;
        }
        public getInputs(cb: kmf.kevoree.modeling.KCallback<org.kevoree.InputPort[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponent.REL_INPUTS, (kObjects) => {
            var casted: org.kevoree.InputPort[] = new Array<org.kevoree.InputPort>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.InputPort>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfInputs(): number {
          return this.size(org.kevoree.meta.MetaComponent.REL_INPUTS);
        }
        public addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Component {
          this.add(org.kevoree.meta.MetaComponent.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Component {
          this.remove(org.kevoree.meta.MetaComponent.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponent.REL_TYPEDEFINITION, (kObjects) => {
            var casted: org.kevoree.TypeDefinition[] = new Array<org.kevoree.TypeDefinition>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.TypeDefinition>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfTypeDefinition(): number {
          return this.size(org.kevoree.meta.MetaComponent.REL_TYPEDEFINITION);
        }
        public addHost(p_obj: org.kevoree.Node): org.kevoree.Component {
          this.add(org.kevoree.meta.MetaComponent.REL_HOST, p_obj);
          return this;
        }
        public removeHost(p_obj: org.kevoree.Node): org.kevoree.Component {
          this.remove(org.kevoree.meta.MetaComponent.REL_HOST, p_obj);
          return this;
        }
        public getHost(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaComponent.REL_HOST, (kObjects) => {
            var casted: org.kevoree.Node[] = new Array<org.kevoree.Node>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Node>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfHost(): number {
          return this.size(org.kevoree.meta.MetaComponent.REL_HOST);
        }
      }
      export class MinConstraintImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.MinConstraint {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getExclusive(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaMinConstraint.ATT_EXCLUSIVE);
        }
        public setExclusive(p_obj: boolean): org.kevoree.MinConstraint {
          this.set(org.kevoree.meta.MetaMinConstraint.ATT_EXCLUSIVE, p_obj);
          return this;
        }
        public getValue(): number {
          return <number>this.get(org.kevoree.meta.MetaMinConstraint.ATT_VALUE);
        }
        public setValue(p_obj: number): org.kevoree.MinConstraint {
          this.set(org.kevoree.meta.MetaMinConstraint.ATT_VALUE, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.MinConstraint {
          this.add(org.kevoree.meta.MetaMinConstraint.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.MinConstraint {
          this.remove(org.kevoree.meta.MetaMinConstraint.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaMinConstraint.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaMinConstraint.REL_METADATA);
        }
      }
      export class ChannelTypeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.ChannelType {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaChannelType.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.ChannelType {
          this.set(org.kevoree.meta.MetaChannelType.ATT_NAME, p_obj);
          return this;
        }
        public getDescription(): string {
          return <string>this.get(org.kevoree.meta.MetaChannelType.ATT_DESCRIPTION);
        }
        public setDescription(p_obj: string): org.kevoree.ChannelType {
          this.set(org.kevoree.meta.MetaChannelType.ATT_DESCRIPTION, p_obj);
          return this;
        }
        public getRemote(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaChannelType.ATT_REMOTE);
        }
        public setRemote(p_obj: boolean): org.kevoree.ChannelType {
          this.set(org.kevoree.meta.MetaChannelType.ATT_REMOTE, p_obj);
          return this;
        }
        public getFragmentable(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaChannelType.ATT_FRAGMENTABLE);
        }
        public setFragmentable(p_obj: boolean): org.kevoree.ChannelType {
          this.set(org.kevoree.meta.MetaChannelType.ATT_FRAGMENTABLE, p_obj);
          return this;
        }
        public getVersion(): number {
          return <number>this.get(org.kevoree.meta.MetaChannelType.ATT_VERSION);
        }
        public setVersion(p_obj: number): org.kevoree.ChannelType {
          this.set(org.kevoree.meta.MetaChannelType.ATT_VERSION, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType {
          this.add(org.kevoree.meta.MetaChannelType.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ChannelType {
          this.remove(org.kevoree.meta.MetaChannelType.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannelType.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaChannelType.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ChannelType {
          this.add(org.kevoree.meta.MetaChannelType.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ChannelType {
          this.remove(org.kevoree.meta.MetaChannelType.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannelType.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.DictionaryType[] = new Array<org.kevoree.DictionaryType>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DictionaryType>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaChannelType.REL_DICTIONARY);
        }
        public addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType {
          this.add(org.kevoree.meta.MetaChannelType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ChannelType {
          this.remove(org.kevoree.meta.MetaChannelType.REL_DEPLOYUNITS, p_obj);
          return this;
        }
        public getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannelType.REL_DEPLOYUNITS, (kObjects) => {
            var casted: org.kevoree.DeployUnit[] = new Array<org.kevoree.DeployUnit>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.DeployUnit>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDeployUnits(): number {
          return this.size(org.kevoree.meta.MetaChannelType.REL_DEPLOYUNITS);
        }
        public addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ChannelType {
          this.add(org.kevoree.meta.MetaChannelType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ChannelType {
          this.remove(org.kevoree.meta.MetaChannelType.REL_PREFEREDVERSIONS, p_obj);
          return this;
        }
        public getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaChannelType.REL_PREFEREDVERSIONS, (kObjects) => {
            var casted: org.kevoree.PreferedVersion[] = new Array<org.kevoree.PreferedVersion>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.PreferedVersion>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfPreferedVersions(): number {
          return this.size(org.kevoree.meta.MetaChannelType.REL_PREFEREDVERSIONS);
        }
      }
      export class ConnectorImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Connector {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaConnector.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Connector {
          this.set(org.kevoree.meta.MetaConnector.ATT_NAME, p_obj);
          return this;
        }
        public getStarted(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaConnector.ATT_STARTED);
        }
        public setStarted(p_obj: boolean): org.kevoree.Connector {
          this.set(org.kevoree.meta.MetaConnector.ATT_STARTED, p_obj);
          return this;
        }
        public addNode(p_obj: org.kevoree.Node): org.kevoree.Connector {
          this.add(org.kevoree.meta.MetaConnector.REL_NODE, p_obj);
          return this;
        }
        public removeNode(p_obj: org.kevoree.Node): org.kevoree.Connector {
          this.remove(org.kevoree.meta.MetaConnector.REL_NODE, p_obj);
          return this;
        }
        public getNode(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnector.REL_NODE, (kObjects) => {
            var casted: org.kevoree.Node[] = new Array<org.kevoree.Node>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Node>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfNode(): number {
          return this.size(org.kevoree.meta.MetaConnector.REL_NODE);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Connector {
          this.add(org.kevoree.meta.MetaConnector.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Connector {
          this.remove(org.kevoree.meta.MetaConnector.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnector.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaConnector.REL_METADATA);
        }
        public addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Connector {
          this.add(org.kevoree.meta.MetaConnector.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Connector {
          this.remove(org.kevoree.meta.MetaConnector.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnector.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.Dictionary[] = new Array<org.kevoree.Dictionary>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Dictionary>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaConnector.REL_DICTIONARY);
        }
        public addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Connector {
          this.add(org.kevoree.meta.MetaConnector.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Connector {
          this.remove(org.kevoree.meta.MetaConnector.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaConnector.REL_TYPEDEFINITION, (kObjects) => {
            var casted: org.kevoree.TypeDefinition[] = new Array<org.kevoree.TypeDefinition>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.TypeDefinition>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfTypeDefinition(): number {
          return this.size(org.kevoree.meta.MetaConnector.REL_TYPEDEFINITION);
        }
      }
      export class NodeImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Node {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public getName(): string {
          return <string>this.get(org.kevoree.meta.MetaNode.ATT_NAME);
        }
        public setName(p_obj: string): org.kevoree.Node {
          this.set(org.kevoree.meta.MetaNode.ATT_NAME, p_obj);
          return this;
        }
        public getStarted(): boolean {
          return <boolean>this.get(org.kevoree.meta.MetaNode.ATT_STARTED);
        }
        public setStarted(p_obj: boolean): org.kevoree.Node {
          this.set(org.kevoree.meta.MetaNode.ATT_STARTED, p_obj);
          return this;
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Node {
          this.add(org.kevoree.meta.MetaNode.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Node {
          this.remove(org.kevoree.meta.MetaNode.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNode.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaNode.REL_METADATA);
        }
        public addComponents(p_obj: org.kevoree.Component): org.kevoree.Node {
          this.add(org.kevoree.meta.MetaNode.REL_COMPONENTS, p_obj);
          return this;
        }
        public removeComponents(p_obj: org.kevoree.Component): org.kevoree.Node {
          this.remove(org.kevoree.meta.MetaNode.REL_COMPONENTS, p_obj);
          return this;
        }
        public getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNode.REL_COMPONENTS, (kObjects) => {
            var casted: org.kevoree.Component[] = new Array<org.kevoree.Component>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Component>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfComponents(): number {
          return this.size(org.kevoree.meta.MetaNode.REL_COMPONENTS);
        }
        public addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Node {
          this.add(org.kevoree.meta.MetaNode.REL_DICTIONARY, p_obj);
          return this;
        }
        public removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Node {
          this.remove(org.kevoree.meta.MetaNode.REL_DICTIONARY, p_obj);
          return this;
        }
        public getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNode.REL_DICTIONARY, (kObjects) => {
            var casted: org.kevoree.Dictionary[] = new Array<org.kevoree.Dictionary>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Dictionary>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfDictionary(): number {
          return this.size(org.kevoree.meta.MetaNode.REL_DICTIONARY);
        }
        public addConnector(p_obj: org.kevoree.Connector): org.kevoree.Node {
          this.add(org.kevoree.meta.MetaNode.REL_CONNECTOR, p_obj);
          return this;
        }
        public removeConnector(p_obj: org.kevoree.Connector): org.kevoree.Node {
          this.remove(org.kevoree.meta.MetaNode.REL_CONNECTOR, p_obj);
          return this;
        }
        public getConnector(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Connector[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNode.REL_CONNECTOR, (kObjects) => {
            var casted: org.kevoree.Connector[] = new Array<org.kevoree.Connector>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Connector>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfConnector(): number {
          return this.size(org.kevoree.meta.MetaNode.REL_CONNECTOR);
        }
        public addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Node {
          this.add(org.kevoree.meta.MetaNode.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Node {
          this.remove(org.kevoree.meta.MetaNode.REL_TYPEDEFINITION, p_obj);
          return this;
        }
        public getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNode.REL_TYPEDEFINITION, (kObjects) => {
            var casted: org.kevoree.TypeDefinition[] = new Array<org.kevoree.TypeDefinition>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.TypeDefinition>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfTypeDefinition(): number {
          return this.size(org.kevoree.meta.MetaNode.REL_TYPEDEFINITION);
        }
        public addHost(p_obj: org.kevoree.Node): org.kevoree.Node {
          this.add(org.kevoree.meta.MetaNode.REL_HOST, p_obj);
          return this;
        }
        public removeHost(p_obj: org.kevoree.Node): org.kevoree.Node {
          this.remove(org.kevoree.meta.MetaNode.REL_HOST, p_obj);
          return this;
        }
        public getHost(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaNode.REL_HOST, (kObjects) => {
            var casted: org.kevoree.Node[] = new Array<org.kevoree.Node>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Node>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfHost(): number {
          return this.size(org.kevoree.meta.MetaNode.REL_HOST);
        }
      }
      export class ModelImpl extends kmf.kevoree.modeling.abs.AbstractKObject implements org.kevoree.Model {
        constructor(p_universe: number, p_time: number, p_uuid: number, p_metaClass: kmf.kevoree.modeling.meta.KMetaClass, p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager, p_previousUniverse: number, p_previoustTime: number) {
          super(p_universe, p_time, p_uuid, p_metaClass, p_manager, p_previousUniverse, p_previoustTime);
        }
        public addMetaData(p_obj: org.kevoree.Value): org.kevoree.Model {
          this.add(org.kevoree.meta.MetaModel.REL_METADATA, p_obj);
          return this;
        }
        public removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Model {
          this.remove(org.kevoree.meta.MetaModel.REL_METADATA, p_obj);
          return this;
        }
        public getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaModel.REL_METADATA, (kObjects) => {
            var casted: org.kevoree.Value[] = new Array<org.kevoree.Value>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Value>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfMetaData(): number {
          return this.size(org.kevoree.meta.MetaModel.REL_METADATA);
        }
        public addNodes(p_obj: org.kevoree.Node): org.kevoree.Model {
          this.add(org.kevoree.meta.MetaModel.REL_NODES, p_obj);
          return this;
        }
        public removeNodes(p_obj: org.kevoree.Node): org.kevoree.Model {
          this.remove(org.kevoree.meta.MetaModel.REL_NODES, p_obj);
          return this;
        }
        public getNodes(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaModel.REL_NODES, (kObjects) => {
            var casted: org.kevoree.Node[] = new Array<org.kevoree.Node>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Node>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfNodes(): number {
          return this.size(org.kevoree.meta.MetaModel.REL_NODES);
        }
        public addChannels(p_obj: org.kevoree.Channel): org.kevoree.Model {
          this.add(org.kevoree.meta.MetaModel.REL_CHANNELS, p_obj);
          return this;
        }
        public removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Model {
          this.remove(org.kevoree.meta.MetaModel.REL_CHANNELS, p_obj);
          return this;
        }
        public getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaModel.REL_CHANNELS, (kObjects) => {
            var casted: org.kevoree.Channel[] = new Array<org.kevoree.Channel>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Channel>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfChannels(): number {
          return this.size(org.kevoree.meta.MetaModel.REL_CHANNELS);
        }
        public addStorage(p_obj: org.kevoree.StorageInfo): org.kevoree.Model {
          this.add(org.kevoree.meta.MetaModel.REL_STORAGE, p_obj);
          return this;
        }
        public removeStorage(p_obj: org.kevoree.StorageInfo): org.kevoree.Model {
          this.remove(org.kevoree.meta.MetaModel.REL_STORAGE, p_obj);
          return this;
        }
        public getStorage(cb: kmf.kevoree.modeling.KCallback<org.kevoree.StorageInfo[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaModel.REL_STORAGE, (kObjects) => {
            var casted: org.kevoree.StorageInfo[] = new Array<org.kevoree.StorageInfo>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.StorageInfo>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfStorage(): number {
          return this.size(org.kevoree.meta.MetaModel.REL_STORAGE);
        }
        public addNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model {
          this.add(org.kevoree.meta.MetaModel.REL_NAMESPACES, p_obj);
          return this;
        }
        public removeNamespaces(p_obj: org.kevoree.Namespace): org.kevoree.Model {
          this.remove(org.kevoree.meta.MetaModel.REL_NAMESPACES, p_obj);
          return this;
        }
        public getNamespaces(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Namespace[]>): void {
          if (cb == null) {
            return;
          }
          this.getRelation(org.kevoree.meta.MetaModel.REL_NAMESPACES, (kObjects) => {
            var casted: org.kevoree.Namespace[] = new Array<org.kevoree.Namespace>(kObjects.length);
            for (var i: number = 0; i < kObjects.length; i++) {
              casted[i] = <org.kevoree.Namespace>kObjects[i];
            }
            cb(casted);
          });
        }
        public sizeOfNamespaces(): number {
          return this.size(org.kevoree.meta.MetaModel.REL_NAMESPACES);
        }
      }
    }
    export interface ComponentType extends kmf.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
      getName(): string;
      setName(p_obj: string): org.kevoree.ComponentType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.ComponentType;
      getRemote(): boolean;
      setRemote(p_obj: boolean): org.kevoree.ComponentType;
      getVersion(): number;
      setVersion(p_obj: number): org.kevoree.ComponentType;
      addInputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
      removeInputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
      getInputTypes(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void;
      sizeOfInputTypes(): number;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ComponentType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ComponentType;
      removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ComponentType;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void;
      sizeOfDictionary(): number;
      addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType;
      removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ComponentType;
      getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void;
      sizeOfDeployUnits(): number;
      addOutputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
      removeOutputTypes(p_obj: org.kevoree.PortType): org.kevoree.ComponentType;
      getOutputTypes(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void;
      sizeOfOutputTypes(): number;
      addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ComponentType;
      removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ComponentType;
      getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void;
      sizeOfPreferedVersions(): number;
    }
    export interface PreferedVersion extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.PreferedVersion;
      getVersion(): string;
      setVersion(p_obj: string): org.kevoree.PreferedVersion;
      getPlatform(): string;
      setPlatform(p_obj: string): org.kevoree.PreferedVersion;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.PreferedVersion;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.PreferedVersion;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface ListParamType extends kmf.kevoree.modeling.KObject, org.kevoree.ParamType {
      getFragment(): boolean;
      setFragment(p_obj: boolean): org.kevoree.ListParamType;
      getName(): string;
      setName(p_obj: string): org.kevoree.ListParamType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.ListParamType;
      getRequired(): boolean;
      setRequired(p_obj: boolean): org.kevoree.ListParamType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParamType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParamType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDefault(p_obj: org.kevoree.Item): org.kevoree.ListParamType;
      removeDefault(p_obj: org.kevoree.Item): org.kevoree.ListParamType;
      getDefault(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Item[]>): void;
      sizeOfDefault(): number;
      addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ListParamType;
      removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.ListParamType;
      getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void;
      sizeOfConstraints(): number;
    }
    export interface Item extends kmf.kevoree.modeling.KObject {
      getValue(): string;
      setValue(p_obj: string): org.kevoree.Item;
    }
    export interface Param extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.Param;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Param;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Param;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addType(p_obj: org.kevoree.ParamType): org.kevoree.Param;
      removeType(p_obj: org.kevoree.ParamType): org.kevoree.Param;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void;
      sizeOfType(): number;
    }
    export interface TypeDefinition extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.TypeDefinition;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.TypeDefinition;
      getVersion(): number;
      setVersion(p_obj: number): org.kevoree.TypeDefinition;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.TypeDefinition;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.TypeDefinition;
      removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.TypeDefinition;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void;
      sizeOfDictionary(): number;
      addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition;
      removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.TypeDefinition;
      getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void;
      sizeOfDeployUnits(): number;
      addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.TypeDefinition;
      removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.TypeDefinition;
      getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void;
      sizeOfPreferedVersions(): number;
    }
    export interface Element extends kmf.kevoree.modeling.KObject {
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Element;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Element;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface MaxConstraint extends kmf.kevoree.modeling.KObject, org.kevoree.AbstractConstraint {
      getExclusive(): boolean;
      setExclusive(p_obj: boolean): org.kevoree.MaxConstraint;
      getValue(): number;
      setValue(p_obj: number): org.kevoree.MaxConstraint;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.MaxConstraint;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.MaxConstraint;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface StringParam extends kmf.kevoree.modeling.KObject, org.kevoree.Param {
      getName(): string;
      setName(p_obj: string): org.kevoree.StringParam;
      getValue(): string;
      setValue(p_obj: string): org.kevoree.StringParam;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParam;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParam;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addType(p_obj: org.kevoree.ParamType): org.kevoree.StringParam;
      removeType(p_obj: org.kevoree.ParamType): org.kevoree.StringParam;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void;
      sizeOfType(): number;
    }
    export interface NumberParamType extends kmf.kevoree.modeling.KObject, org.kevoree.ParamType {
      getDefault(): string;
      setDefault(p_obj: string): org.kevoree.NumberParamType;
      getFragment(): boolean;
      setFragment(p_obj: boolean): org.kevoree.NumberParamType;
      getName(): string;
      setName(p_obj: string): org.kevoree.NumberParamType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.NumberParamType;
      getType(): org.kevoree.NumberType;
      setType(p_obj: org.kevoree.NumberType): org.kevoree.NumberParamType;
      getRequired(): boolean;
      setRequired(p_obj: boolean): org.kevoree.NumberParamType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParamType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.NumberParamType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.NumberParamType;
      removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.NumberParamType;
      getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void;
      sizeOfConstraints(): number;
    }
    export interface StringParamType extends kmf.kevoree.modeling.KObject, org.kevoree.ParamType {
      getDefault(): string;
      setDefault(p_obj: string): org.kevoree.StringParamType;
      getFragment(): boolean;
      setFragment(p_obj: boolean): org.kevoree.StringParamType;
      getName(): string;
      setName(p_obj: string): org.kevoree.StringParamType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.StringParamType;
      getRequired(): boolean;
      setRequired(p_obj: boolean): org.kevoree.StringParamType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParamType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.StringParamType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.StringParamType;
      removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.StringParamType;
      getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void;
      sizeOfConstraints(): number;
    }
    export interface InputPort extends kmf.kevoree.modeling.KObject, org.kevoree.Port {
      getName(): string;
      setName(p_obj: string): org.kevoree.InputPort;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.InputPort;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.InputPort;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addComponents(p_obj: org.kevoree.Component): org.kevoree.InputPort;
      removeComponents(p_obj: org.kevoree.Component): org.kevoree.InputPort;
      getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void;
      sizeOfComponents(): number;
      addChannels(p_obj: org.kevoree.Channel): org.kevoree.InputPort;
      removeChannels(p_obj: org.kevoree.Channel): org.kevoree.InputPort;
      getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void;
      sizeOfChannels(): number;
      addType(p_obj: org.kevoree.PortType): org.kevoree.InputPort;
      removeType(p_obj: org.kevoree.PortType): org.kevoree.InputPort;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void;
      sizeOfType(): number;
    }
    export interface ListParam extends kmf.kevoree.modeling.KObject, org.kevoree.Param {
      getName(): string;
      setName(p_obj: string): org.kevoree.ListParam;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParam;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ListParam;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addValues(p_obj: org.kevoree.Item): org.kevoree.ListParam;
      removeValues(p_obj: org.kevoree.Item): org.kevoree.ListParam;
      getValues(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Item[]>): void;
      sizeOfValues(): number;
      addType(p_obj: org.kevoree.ParamType): org.kevoree.ListParam;
      removeType(p_obj: org.kevoree.ParamType): org.kevoree.ListParam;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.ParamType[]>): void;
      sizeOfType(): number;
    }
    export interface MinConstraint extends kmf.kevoree.modeling.KObject, org.kevoree.AbstractConstraint {
      getExclusive(): boolean;
      setExclusive(p_obj: boolean): org.kevoree.MinConstraint;
      getValue(): number;
      setValue(p_obj: number): org.kevoree.MinConstraint;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.MinConstraint;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.MinConstraint;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface Dictionary extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Dictionary;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Dictionary;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addParams(p_obj: org.kevoree.Param): org.kevoree.Dictionary;
      removeParams(p_obj: org.kevoree.Param): org.kevoree.Dictionary;
      getParams(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Param[]>): void;
      sizeOfParams(): number;
    }
    export interface PortType extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.PortType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.PortType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addProtocol(p_obj: org.kevoree.Value): org.kevoree.PortType;
      removeProtocol(p_obj: org.kevoree.Value): org.kevoree.PortType;
      getProtocol(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfProtocol(): number;
    }
    export interface BooleanParamType extends kmf.kevoree.modeling.KObject, org.kevoree.ParamType {
      getDefault(): boolean;
      setDefault(p_obj: boolean): org.kevoree.BooleanParamType;
      getFragment(): boolean;
      setFragment(p_obj: boolean): org.kevoree.BooleanParamType;
      getName(): string;
      setName(p_obj: string): org.kevoree.BooleanParamType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.BooleanParamType;
      getRequired(): boolean;
      setRequired(p_obj: boolean): org.kevoree.BooleanParamType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParamType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.BooleanParamType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.BooleanParamType;
      removeConstraints(p_obj: org.kevoree.AbstractConstraint): org.kevoree.BooleanParamType;
      getConstraints(cb: kmf.kevoree.modeling.KCallback<org.kevoree.AbstractConstraint[]>): void;
      sizeOfConstraints(): number;
    }
    export interface Port extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getName(): string;
      setName(p_obj: string): org.kevoree.Port;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Port;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Port;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addComponents(p_obj: org.kevoree.Component): org.kevoree.Port;
      removeComponents(p_obj: org.kevoree.Component): org.kevoree.Port;
      getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void;
      sizeOfComponents(): number;
      addChannels(p_obj: org.kevoree.Channel): org.kevoree.Port;
      removeChannels(p_obj: org.kevoree.Channel): org.kevoree.Port;
      getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void;
      sizeOfChannels(): number;
      addType(p_obj: org.kevoree.PortType): org.kevoree.Port;
      removeType(p_obj: org.kevoree.PortType): org.kevoree.Port;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void;
      sizeOfType(): number;
    }
    export interface ConnectorType extends kmf.kevoree.modeling.KObject, org.kevoree.TypeDefinition {
      getName(): string;
      setName(p_obj: string): org.kevoree.ConnectorType;
      getDescription(): string;
      setDescription(p_obj: string): org.kevoree.ConnectorType;
      getVersion(): number;
      setVersion(p_obj: number): org.kevoree.ConnectorType;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.ConnectorType;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.ConnectorType;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ConnectorType;
      removeDictionary(p_obj: org.kevoree.DictionaryType): org.kevoree.ConnectorType;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DictionaryType[]>): void;
      sizeOfDictionary(): number;
      addDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ConnectorType;
      removeDeployUnits(p_obj: org.kevoree.DeployUnit): org.kevoree.ConnectorType;
      getDeployUnits(cb: kmf.kevoree.modeling.KCallback<org.kevoree.DeployUnit[]>): void;
      sizeOfDeployUnits(): number;
      addPreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ConnectorType;
      removePreferedVersions(p_obj: org.kevoree.PreferedVersion): org.kevoree.ConnectorType;
      getPreferedVersions(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PreferedVersion[]>): void;
      sizeOfPreferedVersions(): number;
    }
    export interface StorageInfo extends kmf.kevoree.modeling.KObject, org.kevoree.Element {
      getUri(): string;
      setUri(p_obj: string): org.kevoree.StorageInfo;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.StorageInfo;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.StorageInfo;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
    }
    export interface OutputPort extends kmf.kevoree.modeling.KObject, org.kevoree.Port {
      getName(): string;
      setName(p_obj: string): org.kevoree.OutputPort;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.OutputPort;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.OutputPort;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addComponents(p_obj: org.kevoree.Component): org.kevoree.OutputPort;
      removeComponents(p_obj: org.kevoree.Component): org.kevoree.OutputPort;
      getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void;
      sizeOfComponents(): number;
      addChannels(p_obj: org.kevoree.Channel): org.kevoree.OutputPort;
      removeChannels(p_obj: org.kevoree.Channel): org.kevoree.OutputPort;
      getChannels(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Channel[]>): void;
      sizeOfChannels(): number;
      addType(p_obj: org.kevoree.PortType): org.kevoree.OutputPort;
      removeType(p_obj: org.kevoree.PortType): org.kevoree.OutputPort;
      getType(cb: kmf.kevoree.modeling.KCallback<org.kevoree.PortType[]>): void;
      sizeOfType(): number;
    }
    export interface Node extends kmf.kevoree.modeling.KObject, org.kevoree.Instance {
      getName(): string;
      setName(p_obj: string): org.kevoree.Node;
      getStarted(): boolean;
      setStarted(p_obj: boolean): org.kevoree.Node;
      addMetaData(p_obj: org.kevoree.Value): org.kevoree.Node;
      removeMetaData(p_obj: org.kevoree.Value): org.kevoree.Node;
      getMetaData(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Value[]>): void;
      sizeOfMetaData(): number;
      addComponents(p_obj: org.kevoree.Component): org.kevoree.Node;
      removeComponents(p_obj: org.kevoree.Component): org.kevoree.Node;
      getComponents(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Component[]>): void;
      sizeOfComponents(): number;
      addDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Node;
      removeDictionary(p_obj: org.kevoree.Dictionary): org.kevoree.Node;
      getDictionary(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Dictionary[]>): void;
      sizeOfDictionary(): number;
      addConnector(p_obj: org.kevoree.Connector): org.kevoree.Node;
      removeConnector(p_obj: org.kevoree.Connector): org.kevoree.Node;
      getConnector(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Connector[]>): void;
      sizeOfConnector(): number;
      addTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Node;
      removeTypeDefinition(p_obj: org.kevoree.TypeDefinition): org.kevoree.Node;
      getTypeDefinition(cb: kmf.kevoree.modeling.KCallback<org.kevoree.TypeDefinition[]>): void;
      sizeOfTypeDefinition(): number;
      addHost(p_obj: org.kevoree.Node): org.kevoree.Node;
      removeHost(p_obj: org.kevoree.Node): org.kevoree.Node;
      getHost(cb: kmf.kevoree.modeling.KCallback<org.kevoree.Node[]>): void;
      sizeOfHost(): number;
    }
  }
  export class KevoreeModel extends kmf.kevoree.modeling.abs.AbstractKModel<org.KevoreeUniverse> {
    private _metaModel: kmf.kevoree.modeling.meta.KMetaModel;
    constructor(p_manager: kmf.kevoree.modeling.memory.manager.internal.KInternalDataManager) {
      super(p_manager);
      this._metaModel = new kmf.kevoree.modeling.meta.impl.MetaModel("Kevoree");
      var tempMetaClasses: kmf.kevoree.modeling.meta.KMetaClass[] = new Array<kmf.kevoree.modeling.meta.KMetaClass>(40);
      tempMetaClasses[26] = org.kevoree.meta.MetaParam.getInstance();
      tempMetaClasses[16] = org.kevoree.meta.MetaPortType.getInstance();
      tempMetaClasses[4] = org.kevoree.meta.MetaNode.getInstance();
      tempMetaClasses[15] = org.kevoree.meta.MetaPort.getInstance();
      tempMetaClasses[37] = org.kevoree.meta.MetaMinConstraint.getInstance();
      tempMetaClasses[20] = org.kevoree.meta.MetaNodeType.getInstance();
      tempMetaClasses[13] = org.kevoree.meta.MetaOutputPort.getInstance();
      tempMetaClasses[7] = org.kevoree.meta.MetaInstance.getInstance();
      tempMetaClasses[36] = org.kevoree.meta.MetaListParamType.getInstance();
      tempMetaClasses[1] = org.kevoree.meta.MetaValue.getInstance();
      tempMetaClasses[39] = org.kevoree.meta.MetaMultilineConstraint.getInstance();
      tempMetaClasses[6] = org.kevoree.meta.MetaNamespace.getInstance();
      tempMetaClasses[28] = org.kevoree.meta.MetaNumberParam.getInstance();
      tempMetaClasses[18] = org.kevoree.meta.MetaDeployUnit.getInstance();
      tempMetaClasses[32] = org.kevoree.meta.MetaStringParamType.getInstance();
      tempMetaClasses[5] = org.kevoree.meta.MetaChannel.getInstance();
      tempMetaClasses[17] = org.kevoree.meta.MetaDictionaryType.getInstance();
      tempMetaClasses[10] = org.kevoree.meta.MetaComponent.getInstance();
      tempMetaClasses[27] = org.kevoree.meta.MetaStringParam.getInstance();
      tempMetaClasses[38] = org.kevoree.meta.MetaMaxConstraint.getInstance();
      tempMetaClasses[21] = org.kevoree.meta.MetaConnectorType.getInstance();
      tempMetaClasses[11] = org.kevoree.meta.MetaConnector.getInstance();
      tempMetaClasses[2] = org.kevoree.meta.MetaModel.getInstance();
      tempMetaClasses[9] = org.kevoree.meta.MetaDictionary.getInstance();
      tempMetaClasses[14] = org.kevoree.meta.MetaFragmentDictionary.getInstance();
      tempMetaClasses[19] = org.kevoree.meta.MetaPreferedVersion.getInstance();
      tempMetaClasses[24] = org.kevoree.meta.MetaParamType.getInstance();
      tempMetaClasses[0] = org.kevoree.meta.MetaElement.getInstance();
      tempMetaClasses[25] = org.kevoree.meta.MetaAbstractConstraint.getInstance();
      tempMetaClasses[30] = org.kevoree.meta.MetaListParam.getInstance();
      tempMetaClasses[31] = org.kevoree.meta.MetaItem.getInstance();
      tempMetaClasses[3] = org.kevoree.meta.MetaStorageInfo.getInstance();
      tempMetaClasses[8] = org.kevoree.meta.MetaTypeDefinition.getInstance();
      tempMetaClasses[34] = org.kevoree.meta.MetaBooleanParamType.getInstance();
      tempMetaClasses[35] = org.kevoree.meta.MetaChoiceParamType.getInstance();
      tempMetaClasses[33] = org.kevoree.meta.MetaNumberParamType.getInstance();
      tempMetaClasses[29] = org.kevoree.meta.MetaBooleanParam.getInstance();
      tempMetaClasses[22] = org.kevoree.meta.MetaChannelType.getInstance();
      tempMetaClasses[23] = org.kevoree.meta.MetaComponentType.getInstance();
      tempMetaClasses[12] = org.kevoree.meta.MetaInputPort.getInstance();
      var tempEnums: kmf.kevoree.modeling.meta.KMetaEnum[] = new Array<kmf.kevoree.modeling.meta.KMetaEnum>(1);
      tempEnums[0] = org.kevoree.meta.MetaNumberType.getInstance();
      (<kmf.kevoree.modeling.meta.impl.MetaModel>this._metaModel).init(tempMetaClasses, tempEnums);
    }
    public internalCreateUniverse(key: number): org.KevoreeUniverse {
      return new org.KevoreeUniverse(key, this._manager);
    }
    public metaModel(): kmf.kevoree.modeling.meta.KMetaModel {
      return this._metaModel;
    }
    public internalCreateObject(universe: number, time: number, uuid: number, p_clazz: kmf.kevoree.modeling.meta.KMetaClass, previousUniverse: number, previousTime: number): kmf.kevoree.modeling.KObject {
      if (p_clazz == null) {
        return null;
      }
      switch (p_clazz.index()) {
        case 16:
        return new org.kevoree.impl.PortTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 4:
        return new org.kevoree.impl.NodeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 15:
        return new org.kevoree.impl.PortImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 37:
        return new org.kevoree.impl.MinConstraintImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 20:
        return new org.kevoree.impl.NodeTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 13:
        return new org.kevoree.impl.OutputPortImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 36:
        return new org.kevoree.impl.ListParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 1:
        return new org.kevoree.impl.ValueImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 39:
        return new org.kevoree.impl.MultilineConstraintImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 6:
        return new org.kevoree.impl.NamespaceImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 28:
        return new org.kevoree.impl.NumberParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 18:
        return new org.kevoree.impl.DeployUnitImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 32:
        return new org.kevoree.impl.StringParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 5:
        return new org.kevoree.impl.ChannelImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 17:
        return new org.kevoree.impl.DictionaryTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 10:
        return new org.kevoree.impl.ComponentImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 27:
        return new org.kevoree.impl.StringParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 38:
        return new org.kevoree.impl.MaxConstraintImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 21:
        return new org.kevoree.impl.ConnectorTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 11:
        return new org.kevoree.impl.ConnectorImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 2:
        return new org.kevoree.impl.ModelImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 9:
        return new org.kevoree.impl.DictionaryImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 14:
        return new org.kevoree.impl.FragmentDictionaryImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 19:
        return new org.kevoree.impl.PreferedVersionImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 0:
        return new org.kevoree.impl.ElementImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 30:
        return new org.kevoree.impl.ListParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 31:
        return new org.kevoree.impl.ItemImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 3:
        return new org.kevoree.impl.StorageInfoImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 34:
        return new org.kevoree.impl.BooleanParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 35:
        return new org.kevoree.impl.ChoiceParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 33:
        return new org.kevoree.impl.NumberParamTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 29:
        return new org.kevoree.impl.BooleanParamImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 22:
        return new org.kevoree.impl.ChannelTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 23:
        return new org.kevoree.impl.ComponentTypeImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        case 12:
        return new org.kevoree.impl.InputPortImpl(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
        default:
        return new kmf.kevoree.modeling.meta.impl.GenericObject(universe, time, uuid, p_clazz, this._manager, previousUniverse, previousTime);
      }
    }
    public createPortType(universe: number, time: number): org.kevoree.PortType {
      return <org.kevoree.PortType>this.create(org.kevoree.meta.MetaPortType.getInstance(), universe, time);
    }
    public createNode(universe: number, time: number): org.kevoree.Node {
      return <org.kevoree.Node>this.create(org.kevoree.meta.MetaNode.getInstance(), universe, time);
    }
    public createPort(universe: number, time: number): org.kevoree.Port {
      return <org.kevoree.Port>this.create(org.kevoree.meta.MetaPort.getInstance(), universe, time);
    }
    public createMinConstraint(universe: number, time: number): org.kevoree.MinConstraint {
      return <org.kevoree.MinConstraint>this.create(org.kevoree.meta.MetaMinConstraint.getInstance(), universe, time);
    }
    public createNodeType(universe: number, time: number): org.kevoree.NodeType {
      return <org.kevoree.NodeType>this.create(org.kevoree.meta.MetaNodeType.getInstance(), universe, time);
    }
    public createOutputPort(universe: number, time: number): org.kevoree.OutputPort {
      return <org.kevoree.OutputPort>this.create(org.kevoree.meta.MetaOutputPort.getInstance(), universe, time);
    }
    public createListParamType(universe: number, time: number): org.kevoree.ListParamType {
      return <org.kevoree.ListParamType>this.create(org.kevoree.meta.MetaListParamType.getInstance(), universe, time);
    }
    public createValue(universe: number, time: number): org.kevoree.Value {
      return <org.kevoree.Value>this.create(org.kevoree.meta.MetaValue.getInstance(), universe, time);
    }
    public createMultilineConstraint(universe: number, time: number): org.kevoree.MultilineConstraint {
      return <org.kevoree.MultilineConstraint>this.create(org.kevoree.meta.MetaMultilineConstraint.getInstance(), universe, time);
    }
    public createNamespace(universe: number, time: number): org.kevoree.Namespace {
      return <org.kevoree.Namespace>this.create(org.kevoree.meta.MetaNamespace.getInstance(), universe, time);
    }
    public createNumberParam(universe: number, time: number): org.kevoree.NumberParam {
      return <org.kevoree.NumberParam>this.create(org.kevoree.meta.MetaNumberParam.getInstance(), universe, time);
    }
    public createDeployUnit(universe: number, time: number): org.kevoree.DeployUnit {
      return <org.kevoree.DeployUnit>this.create(org.kevoree.meta.MetaDeployUnit.getInstance(), universe, time);
    }
    public createStringParamType(universe: number, time: number): org.kevoree.StringParamType {
      return <org.kevoree.StringParamType>this.create(org.kevoree.meta.MetaStringParamType.getInstance(), universe, time);
    }
    public createChannel(universe: number, time: number): org.kevoree.Channel {
      return <org.kevoree.Channel>this.create(org.kevoree.meta.MetaChannel.getInstance(), universe, time);
    }
    public createDictionaryType(universe: number, time: number): org.kevoree.DictionaryType {
      return <org.kevoree.DictionaryType>this.create(org.kevoree.meta.MetaDictionaryType.getInstance(), universe, time);
    }
    public createComponent(universe: number, time: number): org.kevoree.Component {
      return <org.kevoree.Component>this.create(org.kevoree.meta.MetaComponent.getInstance(), universe, time);
    }
    public createStringParam(universe: number, time: number): org.kevoree.StringParam {
      return <org.kevoree.StringParam>this.create(org.kevoree.meta.MetaStringParam.getInstance(), universe, time);
    }
    public createMaxConstraint(universe: number, time: number): org.kevoree.MaxConstraint {
      return <org.kevoree.MaxConstraint>this.create(org.kevoree.meta.MetaMaxConstraint.getInstance(), universe, time);
    }
    public createConnectorType(universe: number, time: number): org.kevoree.ConnectorType {
      return <org.kevoree.ConnectorType>this.create(org.kevoree.meta.MetaConnectorType.getInstance(), universe, time);
    }
    public createConnector(universe: number, time: number): org.kevoree.Connector {
      return <org.kevoree.Connector>this.create(org.kevoree.meta.MetaConnector.getInstance(), universe, time);
    }
    public createModel(universe: number, time: number): org.kevoree.Model {
      return <org.kevoree.Model>this.create(org.kevoree.meta.MetaModel.getInstance(), universe, time);
    }
    public createDictionary(universe: number, time: number): org.kevoree.Dictionary {
      return <org.kevoree.Dictionary>this.create(org.kevoree.meta.MetaDictionary.getInstance(), universe, time);
    }
    public createFragmentDictionary(universe: number, time: number): org.kevoree.FragmentDictionary {
      return <org.kevoree.FragmentDictionary>this.create(org.kevoree.meta.MetaFragmentDictionary.getInstance(), universe, time);
    }
    public createPreferedVersion(universe: number, time: number): org.kevoree.PreferedVersion {
      return <org.kevoree.PreferedVersion>this.create(org.kevoree.meta.MetaPreferedVersion.getInstance(), universe, time);
    }
    public createElement(universe: number, time: number): org.kevoree.Element {
      return <org.kevoree.Element>this.create(org.kevoree.meta.MetaElement.getInstance(), universe, time);
    }
    public createListParam(universe: number, time: number): org.kevoree.ListParam {
      return <org.kevoree.ListParam>this.create(org.kevoree.meta.MetaListParam.getInstance(), universe, time);
    }
    public createItem(universe: number, time: number): org.kevoree.Item {
      return <org.kevoree.Item>this.create(org.kevoree.meta.MetaItem.getInstance(), universe, time);
    }
    public createStorageInfo(universe: number, time: number): org.kevoree.StorageInfo {
      return <org.kevoree.StorageInfo>this.create(org.kevoree.meta.MetaStorageInfo.getInstance(), universe, time);
    }
    public createBooleanParamType(universe: number, time: number): org.kevoree.BooleanParamType {
      return <org.kevoree.BooleanParamType>this.create(org.kevoree.meta.MetaBooleanParamType.getInstance(), universe, time);
    }
    public createChoiceParamType(universe: number, time: number): org.kevoree.ChoiceParamType {
      return <org.kevoree.ChoiceParamType>this.create(org.kevoree.meta.MetaChoiceParamType.getInstance(), universe, time);
    }
    public createNumberParamType(universe: number, time: number): org.kevoree.NumberParamType {
      return <org.kevoree.NumberParamType>this.create(org.kevoree.meta.MetaNumberParamType.getInstance(), universe, time);
    }
    public createBooleanParam(universe: number, time: number): org.kevoree.BooleanParam {
      return <org.kevoree.BooleanParam>this.create(org.kevoree.meta.MetaBooleanParam.getInstance(), universe, time);
    }
    public createChannelType(universe: number, time: number): org.kevoree.ChannelType {
      return <org.kevoree.ChannelType>this.create(org.kevoree.meta.MetaChannelType.getInstance(), universe, time);
    }
    public createComponentType(universe: number, time: number): org.kevoree.ComponentType {
      return <org.kevoree.ComponentType>this.create(org.kevoree.meta.MetaComponentType.getInstance(), universe, time);
    }
    public createInputPort(universe: number, time: number): org.kevoree.InputPort {
      return <org.kevoree.InputPort>this.create(org.kevoree.meta.MetaInputPort.getInstance(), universe, time);
    }
  }
  export interface KevoreeView extends kmf.kevoree.modeling.KView {
    createPortType(): org.kevoree.PortType;
    createNode(): org.kevoree.Node;
    createPort(): org.kevoree.Port;
    createMinConstraint(): org.kevoree.MinConstraint;
    createNodeType(): org.kevoree.NodeType;
    createOutputPort(): org.kevoree.OutputPort;
    createListParamType(): org.kevoree.ListParamType;
    createValue(): org.kevoree.Value;
    createMultilineConstraint(): org.kevoree.MultilineConstraint;
    createNamespace(): org.kevoree.Namespace;
    createNumberParam(): org.kevoree.NumberParam;
    createDeployUnit(): org.kevoree.DeployUnit;
    createStringParamType(): org.kevoree.StringParamType;
    createChannel(): org.kevoree.Channel;
    createDictionaryType(): org.kevoree.DictionaryType;
    createComponent(): org.kevoree.Component;
    createStringParam(): org.kevoree.StringParam;
    createMaxConstraint(): org.kevoree.MaxConstraint;
    createConnectorType(): org.kevoree.ConnectorType;
    createConnector(): org.kevoree.Connector;
    createModel(): org.kevoree.Model;
    createDictionary(): org.kevoree.Dictionary;
    createFragmentDictionary(): org.kevoree.FragmentDictionary;
    createPreferedVersion(): org.kevoree.PreferedVersion;
    createElement(): org.kevoree.Element;
    createListParam(): org.kevoree.ListParam;
    createItem(): org.kevoree.Item;
    createStorageInfo(): org.kevoree.StorageInfo;
    createBooleanParamType(): org.kevoree.BooleanParamType;
    createChoiceParamType(): org.kevoree.ChoiceParamType;
    createNumberParamType(): org.kevoree.NumberParamType;
    createBooleanParam(): org.kevoree.BooleanParam;
    createChannelType(): org.kevoree.ChannelType;
    createComponentType(): org.kevoree.ComponentType;
    createInputPort(): org.kevoree.InputPort;
  }
}
